from Cleaner import *
from Machine_Learning import *
from config import db_password


# Clean and write to PostgreSQL
## Collected at https://www.seanlahman.com/baseball-archive/statistics/
awards = pd.read_csv('Resources/AwardsPlayers.csv')
all_awards = reverseLookup(awards)
all_awards.to_csv('Resources/AllAwardsPlayers.csv')

## Merge awards and players dataframes
data_NL, data_AL = Merger(all_awards)

## League Check
mvpVerify(data_NL, all_awards, 'NL').head(12)
mvpVerify(data_AL, all_awards, 'AL').head(12)

## Auto-schema Raw Data to Postgre
engine = create_engine(f"postgresql://postgres:{db_password}@127.0.0.1:5432/Raw_Stats")
data_NL.to_sql(name='NL', con=engine)
data_AL.to_sql(name='AL', con=engine)


# Machine Learning
# League Cleaning and Regression Fitting
data_NL = preProcessing(data_NL)
new_data_NL = createLogisticRegression(data_NL, 'nl')
data_AL = preProcessing(data_AL)
new_data_AL = createLogisticRegression(data_AL, 'al')

# Auto-schema Regression Data to Postgre
engine = sqlalchemy.create_engine(f"postgresql://postgres:{db_password}@127.0.0.1:5432/Raw_Stats")
new_data_NL.to_sql(name='NLMVP', con=engine)
new_data_AL.to_sql(name='ALMVP', con=engine)
