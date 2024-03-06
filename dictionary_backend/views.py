import requests
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import render
from .serializer import SearchHistorySerializer
import json
import re
from base.settings import RAPID_API_KEY

# For definition
API_1 = {
        "method": "GET", 
        "url": "https://api.dictionaryapi.dev/api/v2/entries/en/{}",
    }

# For translation
API_2 = {
    "method": "POST",
    "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "google-translation-unlimited.p.rapidapi.com"
    },
    "url": "https://google-translation-unlimited.p.rapidapi.com/translate",
}

SEARCH_MODE = (
    # mode = 0, definition and example sentence:
    {"api": API_1, "method": "GET"},
    # mode = 1, synonyms and antonyms:
    {"api": API_1, "method": "GET"},
    # mode = 3, translation from english to Traditional Chinese:
    {
        "api": API_2, 
        "method": "POST",
        "params": {
            "texte": "{}",
            "to_lang": "zh-tw",
        }
    },
)

DESIRED_ENTRIES = (
    # 0:
    {"search_items_keys": ("meanings", "&&&partOfSpeech", "definitions", "&&&definition", "&&&example"), "omit_blank": False},
    # 1:
    {"search_items_keys": ("meanings", "&&&synonyms", "&&&antonyms"), "omit_blank": True},
    # 2:
    {"search_items_keys": ("translation_data", "&&&translation"), "omit_blank": True},
)

def show_home_page(request):
    pass

def fetch_data(searched_word, mode):
    api = SEARCH_MODE[mode]["api"]
    
    if SEARCH_MODE[mode]["method"] == "GET":
        if re.search(r"\{\}", api["url"]): # if has {} placeholder
            api["url"] = api["url"].format(searched_word)
        return requests.get(api["url"])
    elif SEARCH_MODE[mode]["method"] == "POST":
        if "params" in SEARCH_MODE[mode]:
            post_data = SEARCH_MODE[mode]["params"]
            for key in post_data:
                if re.search(r"\{\}", post_data[key]): # if has {} placeholder
                    post_data[key] = post_data[key].format(searched_word)
            return requests.post(api["url"], data=post_data, headers=api["headers"])
        else:
            return requests.post(api["url"], headers=api["headers"])
    else:
        return None
    
def search_word(request, searched_word: str, mode: int):
    """ This view return the json data of the definitions of the searched word. Based on
    the mode chosen, the function returns different scope of result.

    Args:
        request: http request
        searched_word: The word to search
        mode: different mode returns different result:
        0: returns (i)part of speech, (ii)definition, (iii) example
        1: returns (i) synonyms, (ii) antonyms
        2: return (i) translated english word in Traditional Chinese
    """
    if not searched_word:
        return
    
    json_data = fetch_data(searched_word, mode).json()
    search_result = {}
    for key in DESIRED_ENTRIES[mode]["search_items_keys"]:
        if key.startswith("&&&"):
            search_result[key[3:]] = []
    
    get_result(DESIRED_ENTRIES[mode]["search_items_keys"], json_data, search_result, DESIRED_ENTRIES[mode]["omit_blank"])
        
    data_for_model = {}
    for key in search_result:
        search_result[key] = list(search_result[key])
        data_for_model[key] = json.dumps(search_result[key])
        
    
    serializer = SearchHistorySerializer(data=data_for_model, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(search_result, safe=False)
    else:
        return HttpResponse(status.HTTP_400_BAD_REQUEST)
    
def get_result(search_items_keys: tuple, json_data, search_result: dict, OMIT_BLANK, search_items_keys_index=0):
    if search_items_keys_index >= len(search_items_keys):
        return
    current_key: str = search_items_keys[search_items_keys_index]
    if type(json_data) is list:
        for entry in json_data:
            get_result(search_items_keys, entry, search_result, OMIT_BLANK, search_items_keys_index)
    elif current_key.startswith("&&&"):
        current_key = current_key[3:]
        if current_key not in json_data or not json_data[current_key]:
            if not OMIT_BLANK:
                search_result[current_key].append(f"No data for {current_key} {len(search_result[current_key]) + 1}")
        elif type(json_data[current_key]) is not list:
            search_result[current_key].append(json_data[current_key])
        else:
            for element in json_data[current_key]:
                search_result[current_key].append(element)
        get_result(search_items_keys, json_data, search_result, OMIT_BLANK, search_items_keys_index + 1)
    else:
        get_result(search_items_keys, json_data[current_key], search_result, OMIT_BLANK, search_items_keys_index + 1)
    
    
    