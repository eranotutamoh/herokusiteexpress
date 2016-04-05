var Suggest =  {
    counter : 0,

    create : function(results) {
        this.counter = 0;
        this.suggestDiv.innerHTML='';
        for(var x in results){
            this.createHtmlList(results[x]);
            this.counter++;
        }
    },
    createHtmlList : function(ingredient) {
        var $this= this;
        var a = document.createElement("a");
        var text = document.createTextNode(ingredient);
        a.appendChild(text);
        a.setAttribute('href','#');
        a.addEventListener('click', function(e) {
            return $this.ingredientSelected(e.target);
        })
        if(this.counter == 0) a.classList.add('hot');
        this.suggestDiv.insertBefore(a, null);
    },
    selectViaKeys : function() {
        var hot = document.querySelector('.hot');
        hot.classList.remove('hot');
        var next = (hot.nextSibling === null) ? this.suggestDiv.firstChild : hot.nextSibling;
        next.classList.add('hot');
    },
    ingredientSelected : function(element) {
        this.input.value='';
        this.selected(element.textContent);
        this.suggestDiv.innerHTML='';
        this.input.focus();
    },
    keyDown : function(e) {
        if(e.code === "Enter") {
            e.preventDefault();
            this.ingredientSelected(this.suggestDiv.querySelector('.hot'))
        }
    },
    keyUp : function(e) {
        if(e.code === "ArrowDown") this.selectViaKeys();
        else if(e.code === "Enter") return false;
        else this.lookup(e.target.value);
    },
    initListeners : function() {
        var $this = this;
        this.input.addEventListener('keydown', function(e) {
            return $this.keyDown(e);
        });
        this.input.addEventListener('keyup', function(e) {
            return $this.keyUp(e);
        });
    },
    init : function ( config ) {
        var tmp = Object.create( this );
        for ( var key in config ) {
            if ( config.hasOwnProperty( key ) ) {
                tmp[key] = config[key];
            }
        }
        tmp.initListeners();
        return tmp;
    }

};















