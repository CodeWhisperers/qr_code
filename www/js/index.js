/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        if (navigator.notification) { // Override default HTML alert with native dialog
                        window.alert = function (message) {
                            navigator.notification.alert(
                                message,    // message
                                null,       // callback
                                "Workshop", // title
                                'OK'        // buttonName
                            );
                        };
                    }
        if ( typeof localCallback != 'undefined' ) {
            localCallback();
        }

        $('#lvl').text(getUserLevel());
        $('#userName').text(getUser());

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        try{
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);

        } catch (err) {
            console.log(err.message);
        }
    }
};

function createCookie(name,value) {
    window.localStorage.setItem(name, value);
//	if (days) {
//		var date = new Date();
//		date.setTime(date.getTime()+(days*24*60*60*1000));
//		var expires = "; expires="+date.toGMTString();
//	}
//	else var expires = "";
//
//	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    return window.localStorage.getItem(name);
//	var nameEQ = name + "=";
//	var ca = document.cookie.split(';');
//    alert(ca);
//	for(var i=0;i < ca.length;i++) {
//		var c = ca[i];
//		while (c.charAt(0)==' ') c = c.substring(1,c.length);
//		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//	}
//	return null;
}

function eraseCookie(name) {
    window.localStorage.removeItem(name);

}


function getUser(){
    return readCookie("loginUserEmail");
}

function getUserLevelKey(){
    var email = getUser();
    return email+"Level";
}

function getUserLevel(){
     var email = getUser();
     if(null==email){
        return 0;
     }else{
        var userLevel = email+"Level";
        var cookieExists = readCookie(userLevel);
        if(null!=cookieExists){
            return cookieExists;
        }else{
            createCookie(userLevel,0);
            return 0;
        }
     }
}

/**
* Will level up the current profile
**/
function lvlUp(){
    var user = getUser();
    if(user){
        var level = getUserLevel();
        var userLevelKey = getUserLevelKey();
        createCookie(userLevelKey,level+1);
    }
}

app.initialize();

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

if (isChrome) {
        // hack to test in chrome
        app.onDeviceReady();
    }