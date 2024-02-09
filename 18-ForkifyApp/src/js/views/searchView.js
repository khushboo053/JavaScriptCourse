class SearchView {
    _parentEl = document.querySelector('.search');

    getQuery() {
        const query = this._parentEl.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        })
    }
}

// We will listen for an event in the view files & then pass the controller function. So the handler function into the method that we will build here.

// So this addHandler, a search method here is basically going to be the publisher anti-control search results function is going to be the subscriber. 

// we cannot simply call the handler immediately, because remember, as we did many times before when we submit a form, we need to first prevent the default action, because otherwise the page is going to reload. So, preventDefault.


// We will then not export the class here, but export the instance so an object that was created by this class
export default new SearchView();