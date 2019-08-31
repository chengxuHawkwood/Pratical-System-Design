# Pratical-System-Design
I have read a lot about System design problems, but felt quite hard to find any implementation. I created this repo to try to implement some of them and combine them in an app.
# Update:Newsfeed pull model and authentication with cookies and sessions 
Finish a MVP of a newsfeed system based on pull model and authentication with sessions. Using expressjs as backend, mongoose as database and  React and Redux as frontend. To figure out each user's timeline, I used merge sort strategy by finding the users' followees' most recent posts and merge them.
# Update:Finished RateLimiter middleware and applied it to the Post method of /api/posts
Using redis to maintain each IP's recent k visits in m milleseconds where k and m are the configurations of the middleware. The redis record data structure is like [[ip+method]:[timestamp1, timestamp2,...]]. 
# Update:Add pagination designs to the postlist
Make use of an offset state to manage the pagination.
