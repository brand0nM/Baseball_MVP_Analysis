# Baseball_MVP_Analysis
## Overview
Predict 2022's MVP for each MLB league

### Purpose
Use python's pybaseball library (developed by James LeDoux, it's essentially a web scrapping package) to gather player statistics, then train a supervised logistic classifier to predict if a player will be made MVP. SQLalchemy was then used to auto schema the data for Postgres. Once historic and predicted data was in SQL we merged the two tables and serve it data to our localhost; then we made an API call to retrieve the data and displayed its insights in a Dashboard on another port.

## Pipeline
### Cleaner.py
Contains a series of functions that pull each season's batting stats from 1982-2021, merge their awards data frame, and classify each player as an MVP with 1 or 0. The data is then split by league and auto schema declares each column for Postgres as tables NL and AL. 
### Machine_Learning.py
Contains a series of functions that pull historic data from Postgres, scale, and train a logistic classifier using Sklearn. Then pull and scale 2022's data from pybaseball- allowing stats like WAR to be comparable midseason. Finally, predict the 2022 MVPs for each league and store this new cleaned dashboard in Postgres. The Predicted MVP- on August 27th- for the National League was Paul Goldschmidt, and American was Aaron Judge; When the pipeline is rerun, MVPs could change since 2022's season is not complete. The accuracy when last ran was 98% and 99% respectively.
### Running The Pipeline

	$ python3 Baseball.py

## Analysis
Throughout the project, decisions were made to help our model more accurately classify MVPs. This first was to drop any years where pitchers had won the title; this excluded the 2014 season for National League and the seasons 1984, 1986, 1992, and 2011 for the American League. In this process, we made batting more of a focus in the model but neglected to consider sporadic years where pitchers had won. We also dropped 2020, since there were fewer overall games, and this skewed recorded stats.
### XBH+
A new metric was added, read "extra base hits plus" that is calculated XBH+ = ((R+2B+3B+HR)-(SO))/PA. It weights players' base hits and strikeouts to their plate appearances; In words, every time you make a plate appearance, how valuable are you? We figured this could be helpful for our MVP analysis

## Dashboard
Using React I was able to create a two-part application that allows us to solidify the pipeline.

![Screen Shot 2022-08-30 at 10 42 47 AM](https://user-images.githubusercontent.com/79609464/187493285-7b863839-077a-4784-bb5a-8880324dc0d2.png)
![Screen Shot 2022-08-30 at 10 42 57 AM](https://user-images.githubusercontent.com/79609464/187493308-5bb8de02-6cf0-4364-ac5d-fa9a0269ec91.png)

### Server
The server side of our build uses node package manager to pool the selected data from Postgres and host it as a local API

https://user-images.githubusercontent.com/79609464/187453057-f86e069e-f623-4421-8f05-937b9f485cdc.mp4

### React Application
While loading, the app calls the server API using an async try fetch statement, then adds its results to a local state called data in the App component; Another state is initialized called form which holds the selections of our filters. Then the data and form states are passed to each graph component, where local data states are initialized that hold subsections of the data we want to display. Since these subsections are dependent on our forms selection, React's useEffect hook resolves this conflict; on changes to our form, if the data exist, gather that data's subset.

https://user-images.githubusercontent.com/79609464/187453162-0416a0a0-7540-4e5d-b433-0921c41da837.mp4

## Summary
A data pipeline was created that displays up-to-date MLB stats and MVP predictions for each league

### Group Work
[Repository](https://github.com/lbp12/Moneyball)<br /><br />
[Final Presentation](https://docs.google.com/presentation/d/1XskK5MMPLX6G7jf0J1knfi2zl5QrayQTjjjfoeoP_kA/edit?usp=sharing)


