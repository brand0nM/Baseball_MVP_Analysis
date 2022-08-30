# Baseball_MVP_Analysis
## Overview
Predict 2022's MVP for each MLB league

### Purpose
Use python's pybaseball library (developed by James LeDoux, its essentially a webscrapping package) to gather player statstics, then train a supervised logistic classifier to predict if a player will be made MVP. SQLalchemy was then used to autoschema the data for Postgres. Once historic and predicted data was in SQL we merged the two tables and serve it data to our localhost; then we made an API call to retrieve the data and diplayed its insights in a Dashboard on another port.

## Pipeline
Functional Based Programing was used to store cleaning functions outside the main notebooks; this was done to make the notebooks more legible

### Cleaner.py
Contains a series of functions that pull each seasons batting stats from 1982-2021, merges their awards dataframe and classifies each player as an MVP with 1 or 0. The data is then split by league and autoschema declares each columns for Postgres as tables NL and AL. 

### Machine_Learning.py
Contains a series of functions that pull 1982-2021's data from Postgres, scale, and train a logistic classifier using Sklearn. Then pull and scale 2022's data- allowing stats like WAR to be comparable midseason. Finally, predict the 2022 MVP's for each league and store this new cleaned dashboard in Postgres. The Predicted MVP- on August 27th- for the National League was Paul Goldschmidt, and American was Aaron Judge; When the pipeline is rerun, MVP's could change since 2022's season is not complete. The accuracy when last ran was 98% and 99% respectively.

## Analysis
Through out the project decisions were made to help our model more accuratly classify MVP's. This first was to drop any years where pitchers had won the title; this excluded the 2014 season for National League and the seasons 1984, 1986, 1992, 2011 for the American League. In this process we made batting more of a focus for the model, but neglect to consider the random years where pitchers had won. We also dropped 2020, since there were less overall games and this skewed recorded stats.
### XBH+
We also added a new metric read "extra base hits plus" that is calculated XBH+ = ((R+2B+3B+HR)-(SO))/PA. The metric weights their base hits and stikeouts to their plate apperances; In words, everytime you make a plate apperance, how valuable are you? We figured this could be helpful for our MVP analysis

## Dashboard
Using React I was able to create a two part application that allows us to solidify the pipline.

### Server

https://user-images.githubusercontent.com/79609464/187453057-f86e069e-f623-4421-8f05-937b9f485cdc.mp4
https://user-images.githubusercontent.com/79609464/187453162-0416a0a0-7540-4e5d-b433-0921c41da837.mp4




### Group Presentation
View our final presentation:<br>
https://docs.google.com/presentation/d/1XskK5MMPLX6G7jf0J1knfi2zl5QrayQTjjjfoeoP_kA/edit?usp=sharing
![Group Repository](https://github.com/lbp12/Moneyball)

