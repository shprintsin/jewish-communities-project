import pandas as pd
import os
os.listdir()
pd.read_csv('app/gazzeter/gazzeter.csv').to_json('app/gazzeter/gazzeter.json', orient='records')