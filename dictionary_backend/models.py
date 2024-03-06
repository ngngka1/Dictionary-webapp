from django.db import models
import datetime

# Create your models here.
class SearchHistory(models.Model):
    word = models.CharField(max_length=200)
    search_time = models.DateField(default=datetime.date.today)
    partOfSpeech = models.TextField(default='') # Camel naming case here to suit the api
    definition = models.TextField(default='')
    synonyms = models.TextField(default='')
    antonyms = models.TextField(default='')
    translation = models.TextField(default='')
    
    def __str__(self):
        return self.word