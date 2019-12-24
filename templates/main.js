function main() {
  $('.scrollDown').click(function() {
    scrollTo('.contentContainer')
  })
}

$(document).ready(function() {
  main();
})

function scrollTo(id) {

	$(document).ready(function (){
			$('html, body').animate({
			scrollTop: $(id).offset().top
		}, 1300);
	});
}
document.querySelector('#header');

setTimeout(() => {
headerElement.style.color = 'lime';
} , 3000);

//  ^^^Controls the title header ^^ //




const subheaderElement =
document.querySelector('#subheader span');

subheaderElement.addEventListener('mouseover',() => {
  subheaderElement.style.color = 'blue';
});
subheaderElement.addEventListener('mouseleave',() => {
  subheaderElement.style.color = '#73a9ff';
});
