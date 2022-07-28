'use strict';

// selecting elements
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');
const burger = document.querySelector('.menu-btn');
const menuList = document.querySelector('.main-header__list');
const tabContainer = document.querySelector('.testemonial__tabs');
const allTabs = document.querySelectorAll('.testemonial__tab');
const allTabContent = document.querySelectorAll('.testemonial__item');
const sliderContainer = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider__img');
const btnPrev = sliderContainer.querySelector('.btn-prev');
const btnNext = sliderContainer.querySelector('.btn-next');
const dots = document.querySelector('.dots');
const contactsBody = document.querySelector('.contacts__body');
const header = document.querySelector('.main-header');


// observer (header-sticky)
const banner = document.querySelector('.banner');
const headerHeight = header.getBoundingClientRect().height;

const obsBanner = function (entries) {
	const [entry] = entries;
	entry.isIntersecting ? header.classList.remove('sticky') : header.classList.add('sticky');
}

const bannerObserver = new IntersectionObserver(obsBanner, { root: null, threshold: [0], rootMargin: `-${headerHeight}px`, });
bannerObserver.observe(banner);


// observer (sections)
const revealSection = function (entries, observer) {
	const [entry] = entries;
	if (entry.isIntersecting) {
		entry.target.classList.remove('section-hidden');
		observer.unobserve(entry.target);
	}
}

const sectionsObserver = new IntersectionObserver(revealSection, { root: null, threshold: [0.2], rootMargin: '20px' })

const allSections = document.querySelectorAll('.section[id]');

allSections.forEach(section => {
	sectionsObserver.observe(section);
	section.classList.add('section-hidden');
});


// filter
// const imgReveal = function (entries, observer) {
// 	const [entry] = entries;
// 	console.log(entry);
// 	// if (entry.isIntersecting) {
// 	// 	entry.target.classList.remove('filtered');
// 	// 	observer.unobserve(entry.target);
// 	// }
// }
// const imgObserver = new IntersectionObserver(imgReveal, { root: null, threshold: 0.5, });

// const allIbg = document.querySelectorAll('.ibg');
// console.log(allIbg);
// allIbg.forEach(img => {
// 	img.classList.add('filtered');
// 	imgObserver.observe(img);
// })


// menu burger
burger.addEventListener('click', function (e) {
	const menuList = document.querySelector('.main-header__list');
	menuList.classList.toggle('list-active');
	this.classList.toggle('menu-active-btn');
	document.body.classList.toggle('hidden');
	overlay.classList.toggle('none');
})
menuList.addEventListener('click', function (e) {
	if (burger.classList.contains('menu-active-btn')) {
		if (e.target.closest('.main-header__link')) {
			this.classList.toggle('list-active');
			overlay.classList.toggle('none');
			burger.classList.toggle('menu-active-btn');
			document.body.classList.toggle('hidden');

		}
	}
})




// modal
document.body.addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.closest('.btn')) {
		modal.classList.remove('none');
		overlay.classList.remove('none');
		document.body.classList.add('hidden');
	}
})
document.addEventListener('keydown', function (e) {
	if (burger.classList.contains('menu-active-btn')) return;
	if (e.code === 'Escape') {
		modal.classList.add('none');
		overlay.classList.add('none');
		document.body.classList.remove('hidden');
	}
})
overlay.addEventListener('click', function (e) {
	if (burger.classList.contains('menu-active-btn')) return;
	this.classList.add('none');
	modal.classList.add('none');
	document.body.classList.remove('hidden');
})
closeModalBtn.addEventListener('click', function (e) {
	modal.classList.add('none');
	overlay.classList.add('none');
	document.body.classList.remove('hidden');
})

// Reveal elements
const nav = document.querySelector('.main-header__menu');
const handleHeader = function (e) {
	if (e.target.closest('.main-header__link')) {
		const link = e.target;
		const siblings = e.target.closest('.main-header__menu').querySelectorAll('.main-header__link');
		const logo = e.target.closest('.main-header').querySelector('.logo');


		siblings.forEach(s => {
			if (s !== link) {
				s.style.filter = `blur(${this}px)`;
			}
		})
		logo.style.filter = `blur(${this}px)`;
	}
}
nav.addEventListener('mouseover', handleHeader.bind(2));
nav.addEventListener('mouseout', handleHeader.bind(0));


// Tabbed components
allTabs.forEach((tab, index) => {
	tab.setAttribute('data-set', index + 1);
	// allTabContent[index].classList.add(`tab-content-${index + 1}`, 'none');
});

tabContainer.addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.closest('.testemonial__tab')) {
		const currentTab = e.target;
		const { set: id } = currentTab.dataset;
		allTabs.forEach((tab, index) => {
			tab.classList.remove('tab-active');
			allTabContent[index].classList.remove('active-tab-content');
		});
		currentTab.classList.add('tab-active');
		allTabContent[id - 1].classList.add('active-tab-content');
	}
})


// slider
slides.forEach((slide, index) => {
	slide.style.transform = `translateX(${100 * index}%)`;
	dots.insertAdjacentHTML('beforeend', `<span class="dot" data-dot="${index + 1}">${index + 1}</span>`);
})

dots.children[0].classList.add('active-dot');

const handleSlides = function (which) {
	slides.forEach((slide, index) => {
		slide.style.transform = `translateX(${100 * (index - which)}%)`;
		dots.children[index].classList.remove('active-dot');
	})
	const currentDot = dots.querySelector(`[data-dot="${which + 1}"]`);
	currentDot.classList.add('active-dot');
}
handleSlides(0);

let currentSlide = 0;
const maxSlides = slides.length;
btnPrev.addEventListener('click', function (e) {

	if (currentSlide === 0) {
		currentSlide = maxSlides - 1
	}
	else {
		currentSlide--;
	}
	handleSlides(currentSlide);
})
btnNext.addEventListener('click', function (e) {
	if (currentSlide === maxSlides - 1) {
		currentSlide = 0;
	}
	else {
		currentSlide++;
	}
	handleSlides(currentSlide);

})

dots.addEventListener('click', function (e) {
	if (e.target.closest('.dot')) {
		let id = e.target.getAttribute('data-dot');
		handleSlides(--id);
	}
})

// label
contactsBody.addEventListener('click', function (e) {
	if (e.target.closest('.contacts__label-title')) {
		const allTitles = contactsBody.querySelectorAll('.contacts__label-title');
		const allList = contactsBody.querySelectorAll('.contacts__list');

		allTitles.forEach((title, index) => {
			title.classList.remove('active-label-title');
			allList[index].classList.remove('active-list');
		})
		const target = e.target;
		target.classList.add('active-label-title');
		target.nextElementSibling.classList.add('active-list');
	}
})


// scroll

menuList.addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.closest('.main-header__link')) {
		const id = e.target.getAttribute('href');
		// const target = document.querySelector(id);
		if (id !== '#') {
			function setScrollIntoView(top) {
				const selected = document.querySelector(id);
				console.log(selected);
				alert('hacked');
				selected.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
			setScrollIntoView(true);
		}
	}
})

