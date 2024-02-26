import requests
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import render
from .serializer import SearchHistorySerializer
import datetime
import json

API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
SEARCH_MODE = [
    # mode 0
    [
        ["meanings", ["partOfSpeech"] , "definitions", ["definition"], ["example"] ], 
    ],
    
    # mode 1
    [
        ["meanings", ["partOfSpeech"], ["synonyms"], ["antonyms"], "definitions", ["definition"], ["example"]], 
    ]
]

def show_home_page(request):
    pass

def fetch_data(searched_word):
    if searched_word:
        return requests.get(API_URL + searched_word)
    else:
        return None
    
def search_word(request, searched_word: str, mode: int = 0):
    """ This view return the json data of the definitions of the searched word. Based on
    the mode chosen, the function returns different scope of result.

    Args:
        request: http request
        searched_word: The word to search
        mode: different mode returns different result:
        0: returns (i)part of speech, (ii)definition, (iii) example
        1: returns (i)part of speech, (ii)definition, (iii) example, (iv) synonyms, (v) antonyms

    Returns:
        _type_: _description_
    """
    json_data = fetch_data(searched_word).json()
    search_result = {}
    
    for search_items_keys in SEARCH_MODE[mode]:
        get_result(search_items_keys, 0, json_data, search_result)
    # print("formatted result is:\n", search_result)
    # print("type: ", type(search_result))
        
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
    
def get_result(search_items_keys: list, search_items_keys_index: int, json_data, search_result: dict):
    if search_items_keys_index >= len(search_items_keys):
        return
    
    if type(json_data) is list:
        for entry in json_data:
            if type(entry) is str:
                print(entry)
            get_result(search_items_keys, search_items_keys_index, entry, search_result)
    else:
        current_key = search_items_keys[search_items_keys_index]
        if type(current_key) is list:
            # search_items_key_branch will be a list of keys of the current branch
            get_result(current_key, 0, json_data, search_result)
            get_result(search_items_keys, search_items_keys_index + 1, json_data, search_result)
        elif search_items_keys_index == len(search_items_keys) - 1: # if reached the last key
            if current_key not in json_data or not json_data[current_key]:
                result = ["No data"]
            else:
                result = json_data[current_key]
                if type(result) is not list:
                    result = [result]
                 
            for element in result:
                if current_key in search_result:
                    search_result[current_key].append(element)
                else:
                    search_result[current_key] = [element]
        else:
            get_result(search_items_keys, search_items_keys_index + 1, json_data[current_key], search_result)
    
    
    