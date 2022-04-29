//rename this file to 'credentials.js' after putting in your relevant info
//All of the info pertaining to trakt authentication can be found at:
// https://trakt.docs.apiary.io/#reference/authentication-devices/get-items-on-a-list?console=1
// They outline the steps to work their api better than i could. keep in mind you're looking for the instructures for 
// 'device code'.

const yourEmbyServerURL = 'fillmein'
const yourEmbyAPIKey = 'grabthisfromyourembyserver'
const yourDeviceCodeFromTrakt = 'grab from trakt'
const yourUserCodeFromTrakt = 'grab from trakt'
const yourTraktAccess_Token = 'grab from trakt'
const yourTraktAccessTokenRefreshToken = 'grab from trakt'
const whatTraktCallsYourActualAPIKey = 'grab from trakt'

//can change to https or http
export const url = 'http://'+ yourEmbyServerURL +'/emby/'

export const apikey = '&api_key=' + yourEmbyAPIKey


// unclear if the structure of the trakt api will require you to change the "expires_in" and "Created_at" field
// but if you follow the steps in the trakt documentation, you'll get back an object with those values prefilled
// so if you need to you can just swap it out

export const traktDeviceAndUserCode = {
    "device_code": yourDeviceCodeFromTrakt,
    "user_code": yourUserCodeFromTrakt,
    "verification_url": "https://trakt.tv/activate",
    "expires_in": 600,
    "interval": 5
}

export const traktaccess_token = {
    "access_token": yourTraktAccess_Token,
    "token_type": "bearer",
    "expires_in": 7776000,
    "refresh_token": yourTraktAccessTokenRefreshToken,
    "scope": "public",
    "created_at": 1651243247
}

export const traktAPIKey = whatTraktCallsYourActualAPIKey