import requests
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import render
from .serializer import SearchHistorySerializer
import datetime
import json
from typing import Sequence

API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
SEARCH_MODE = (
    # Note: tuple in the search_items_keys tuple is the desired items
    # mode 0
    {
        "search_items_keys": ("meanings", ("partOfSpeech",) , "definitions", ("definition",), ("example",) ), 
        "omit_blank": False
    },
    
    # mode 1
    {
        "search_items_keys": ("meanings", ("synonyms",), ("antonyms",), ),
        "omit_blank": True
    }
)

def show_home_page(request):
    pass

def fetch_data(searched_word):
    if searched_word:
        return requests.get(API_URL + searched_word)
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

    Returns:
        _type_: _description_
    """
    json_data = fetch_data(searched_word).json()
    search_result = {}
    
    get_result(SEARCH_MODE[mode]["search_items_keys"], 0, json_data, search_result, SEARCH_MODE[mode]["omit_blank"])
        
    data_for_model = search_result.copy()
    for key, value in data_for_model.items():
        data_for_model[key] = json.dumps(value)
        # print("type after json dump: ", type(search_result[key]))
    
    serializer = SearchHistorySerializer(data=data_for_model, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(search_result, safe=False)
    else:
        return HttpResponse(status.HTTP_400_BAD_REQUEST)
    
def get_result(search_items_keys: tuple, search_items_keys_index: int, json_data, search_result: dict, OMIT_BLANK):
    if search_items_keys_index >= len(search_items_keys):
        return
    
    current_key = search_items_keys[search_items_keys_index]
    
    if type(json_data) is list:
        for entry in json_data:
            get_result(search_items_keys, search_items_keys_index, entry, search_result, OMIT_BLANK)
    elif type(current_key) is tuple:
        current_key = current_key[0]
        if current_key not in json_data or not json_data[current_key]:
            if OMIT_BLANK:
                result = None
            else:
                result = ["No data"]
        else:
            if type(json_data[current_key]) is list:
                result = json_data[current_key]
            else:
                result = [json_data[current_key]]
        
            
        if result:
            for element in result:
                if current_key in search_result:
                    search_result[current_key].append(element)
                else:
                    search_result[current_key] = [element]
        get_result(search_items_keys, search_items_keys_index + 1, json_data, search_result, OMIT_BLANK)
    else:
        # move on to the inner nested key-value
        get_result(search_items_keys, search_items_keys_index + 1, json_data[current_key], search_result, OMIT_BLANK)
    
    
    