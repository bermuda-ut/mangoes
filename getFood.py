from nltk.corpus import wordnet as wn
from pymongo import MongoClient
import string
import sys

def insert(w):
    cursor = coll.find_one({
        'name': w
        })

    if cursor == None:
        coll.insert_one({'name': w})
        print "Inserted {}".format(w)

customList = ['milk', 'beer', 'apple', 'egg', 'eggs'];

print "Connecting to mongoDB"
try:
    client = MongoClient("mongodb://localhost:3001/meteor")
    db = client.meteor
    coll = db.Ingredients
except:
    print "Unable to connect to mongoDB"
    exit(1)

if(len(sys.argv) > 1):
    print "Resetting Ingredients collection"
    coll.drop()

print "Importing food based on NLTK database.."

f = wn.synset('food.n.02')
q = list(set([string.replace(w, '_', ' ').lower() for s in f.closure(lambda s:s.hyponyms()) for w in s.lemma_names()]))
q.sort()

for w in customList:
    insert(w)

for w in q:
    insert(w)
