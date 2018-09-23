--Unstated Container needs to persist state after server side rendering by hydrating with data from the server--

in _app.js page in getinitialprops check to see if the server is doing a server side render and if it is then call a method of the unstated usercontainer that will hydrate the store with the currently authed user