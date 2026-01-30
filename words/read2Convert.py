import pandas as pd
import json

df = pd.read_csv("10kEnWords.txt")
f = open("words.json", "w")
fileList = []

onlyFiveWord = df["Words"].str.len() == 5
fileList = df[onlyFiveWord]["Words"].tolist()
json.dump(fileList, f)

f.close()