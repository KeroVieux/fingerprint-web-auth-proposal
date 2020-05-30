# Fingerprint Web Auth Proposal
## why I show you this
There are many guys require to settle cross-domain token, but all most all reply is it not gonna happen, please change your mind.  
Trust me, it easy to make it happen, just follow my step, this proposal will show you something brand new. 

## confirm that what you need to address
1. prohibit users to share the link to someone else;
2. always can get the user token or the userId, whatever the user link to which domain;

## How to do
1. use fingerprint2 to identify the user's device
2. in order to increase the probability of detection that device as unique, get the user's IP is required.
3. set up a database to store the login record
4. when a user login one of your app, you insert a record to the database, like { authId, IP, fingerprint,jwtToken }
5. when a user needs to check the auth status, you can search the database, match this user's { authId, IP, fingerprint }

## disadvantage
1. a user shared a link to a man who has the same fingerprint info, that will be leaked information ( I assert just a few people have the same fingerprint info)
2. users can share the link / authId / fingerprint info with other people(I just can say someone can share their account and password with other people, how can you stop it)

## 3 api
### login
1. after the oauth action, you have got the userId
2. post the data { userId, fingerprint } to the login api, that will return a authId
3. store the authId in localstorage

### check
1. post the data { authId, fingerprint } to the check api, that will return a userId and the jwtToken
2. if it is not a legal user, the api will return false

### logout
1. remove the authId in localstorage
2. post the data { authId } to the logout api, that will return true.

## enter an app in a different domain
1. the href should be xxx.com?authId=:authId
2. store the authId in localstorage
3. post the data { authId, fingerprint } to the check api, that will return a userId

## what now
1. you can see, when a user stays in your app have the userId, it can assert it as a legal user.
2. post the userId to your access center server to check the user's auth
3. post the userId to your user center server to get user profile
4. use the jwtToken to require api what you need.
