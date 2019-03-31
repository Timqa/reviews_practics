window.addEventListener ('load', function (e) {

	let form = document.querySelector('.form');
	let divLayout = document.querySelector('.some__text');
	let textArea = document.querySelector('textarea');
	let mask = 'des_';

	function searchValue (e) {

		if(textArea.value === ''){
			alert('Вы ничего не написали !!! Мы хотим отзыв )');
		} else {
      let newId = 0;
      let descr = textArea.value;
      let childLayout = divLayout.childNodes;

      childLayout.forEach((el) => {
        let newEl = el.getAttribute('data-id').slice(4);
        // debugger;
        console.log(newEl);
        if(newEl > newId){
          newId = newEl;
        }
      });
      newId++;
      localStorage.setItem(mask+newId, descr);

      let p = document.createElement('p');
      p.setAttribute('data-id', mask+newId);
      p.innerText = descr;
      divLayout.insertBefore(p, divLayout.children[0]);
      form.reset();
    }


	}

	function getReview () {
		let storageLen = localStorage.length;

		if (storageLen > 0){
			for (let i = 0; i < storageLen; i++) {
				let key = localStorage.key(i);
				if (key.indexOf(mask) === 0){
					let p = document.createElement('p');
					p.setAttribute('data-id', key);
					p.innerText = localStorage.getItem(key);
					divLayout.insertBefore(p, divLayout.children[0]);
				}
			}
		}
	}

	getReview();

	function clearComents (){       //очищает от данных в localStorage
		window.localStorage.clear();
		location.reload();
	}

	function generateComments (e){
		e.preventDefault();
		searchValue();

	}

	document.querySelector('.clear').addEventListener('click', clearComents);
	document.querySelector('.form').addEventListener('submit', generateComments);
});
