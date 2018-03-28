# product-display

I've chosen not to use ES6 features because that would require me to set up a build system which would compile the javascript back to code which is supported by most browsers. I could've chosen to only support the latest browsers but I like the challenge I find in these limitations.

I've really come to appriciate template engines because they make rendering and updating the html so much easier than trying to do update every html element yourself.

First I thought there wouldn't be much logic and I could keep it all in one javascript file and it would still be readable but I'm now at the point where it's already becoming pretty complicated. I might have to look at splitting the code up in different files and creating objects which provide functionality. Classes would be nice but that's also an ES6 feature.

## Time

### 2018-03-26 20:00:00 - 2018-03-26 20:50:00
* Build html
* Retrieve resource from api
* Render simple list

### 2018-03-28 20:00:00 - 2018-03-28 22:30:00
* Render html for product detail
* Add a little css to put the images on top of each other so we can animate them later
* Switch between the two different views