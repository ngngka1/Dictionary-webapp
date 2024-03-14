# Dictionary webapp

A web application that provides general functions of a learner dictionary, such as: (Previews are available, please scroll down) <br>

1. Dictionary<br>
2. Thesaurus<br>
3. Translator<br>
4. Word Quiz (WIP)<br>

Word Quiz will ask questions about random vocabularies, mainly extracted from words in the search history stored in database, maybe AI will be involved in creating questions (when I pay for openAI api)

## Steps to launch the website with docker:
(Step 1 and 2 can be skipped if you do not have a rapid api key)

1. go get a rapid api key from https://rapidapi.com , and put it in .envexample
2. subscribe to (https://rapidapi.com/andryerics/api/google-translation-unlimited)
3. Rename .envexample to .env
4. Run:

```
docker-compose up
```

5. Done, go to http://localhost:4173/ to access the web app

## Preview

### Home page

![home_preview](READMEassets/home_preview.jpg)

### Login page

![login_preview](READMEassets/login_preview.jpg)

### dictionary page (with result)

![dictionary_test](READMEassets/dictionary_test.jpg)

### thesaurus page (with result)

![thesaurus_test](READMEassets/thesaurus_test.png)

### translator page (with result)

![translator_test](READMEassets/translator_test.jpg)
