document.addEventListener('DOMContentLoaded', ()=>{

    `use strict`

    const getData = (url,callback) => {
        const request= new XMLHttpRequest()
        request.open('GET', url)
        request.send()
        request.addEventListener('readystatechange',() => {
            if(request.readyState!==4) return
            if(request.status===200){
                const response = JSON.parse(request.response)
                callback(response)
            } else {
                console.error(new Error('Ошибка: '+ request.status))
            }
        })
    }

    getData('cross-sell-dbase/dbase.json', (data) => {
        console.log(data)
    })

    const tabs = () => {

        const cardDetailChange = document.querySelectorAll('.card-detail__change')
        const cardDetailsTitle = document.querySelector('.card-details__title')
        const cardImageItem=document.querySelector('.card__image_item')
        const cardDetailsPrice=document.querySelector('.card-details__price')
        const descriptionMemory=document.querySelector('.description__memory')

        const data = [
            {
                name:'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img:'img/iPhone-graphite.png',
                price: 95990,
                memoryROM:128
            },
            {
                name:'Смартфон Apple iPhone 12 Pro 256GB Silver',
                img:'img/iPhone-silver.png',
                price: 97990,
                memoryROM:256
            },
            {
                name:'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img:'img/iPhone-blue.png',
                price: 99990,
                memoryROM:128
            }
        ]

        const deactive = () =>{
            cardDetailChange.forEach(btn=>btn.classList.remove('active'))
        }

        cardDetailChange.forEach((btn, i) => {
            btn.addEventListener('click',() =>{
                if (!btn.classList.contains('active')){
                    deactive()
                    btn.classList.add('active')

                    cardDetailsTitle.textContent = data[i].name
                    cardImageItem.src = data[i].img
                    cardImageItem.alt= data[i].name
                    cardDetailsPrice.textContent= data[i].price + '₽'
                    descriptionMemory.textContent= `Встроенная память (ROM) ${data[i].memoryROM} ГБ`
                }
            })
        });








        // Простой Вариант===========================
        // 
        // const cardDetailChange = document.querySelectorAll('.card-detail__change')
        // const cardDetailsTitle = document.querySelectorAll('.card-details__title')
        // const cardImage = document.querySelectorAll('.card__image')

        // const hideAll= () =>{
        //     for(let i=0;i< cardDetailChange.length;i++){
        //         cardDetailChange[i].classList.remove('active')
        //         cardDetailsTitle[i].classList.remove('active')
        //         cardImage[i].classList.remove('active')
        //     }
        // }

        // for(let i=0;i<cardDetailChange.length;i++){
        //     cardDetailChange[i].addEventListener('click',()=>{

        //         hideAll()

        //         cardDetailChange[i].classList.add('active')
        //         cardDetailsTitle[i].classList.add('active')
        //         cardImage[i].classList.add('active')

        //     })
        // }
    }

    const accordion = () => {
        const characteristicsList = document.querySelector('.characteristics__list')
        const characteristicsItem = document.querySelectorAll('.characteristics__item')

        const open = (button, dropDown) =>{
            closeAllDrops()
            dropDown.style.height=`${dropDown.scrollHeight}px`
            button.classList.add('active')
            dropDown.classList.add('active')
        }

        const close = (button, dropDown) =>{
            button.classList.remove('active')
            dropDown.classList.remove('active')
            dropDown.style.height=''
        }

        const closeAllDrops = (button, dropDown) =>{
            characteristicsItem.forEach((elem)=>{
                if(elem.children[0] !== button && elem.children[1] !== dropDown){
                    close(elem.children[0],elem.children[1])
                }
            })
        }

        characteristicsList.addEventListener('click',(event)=>{
            const target = event.target
            if(target.classList.contains('characteristics__title')){
                const parent = target.closest('.characteristics__item')
                const description = parent.querySelector('.characteristics__description')
                description.classList.contains('active') ? close(target, description) : open(target,description)
            }
        })

        document.body.addEventListener('click',(event)=>{
            const target = event.target
            if(!target.closest('.characteristics__list')){
                closeAllDrops()
            }
        })



        // Простой способ=========================================
        // const characteristicsTitle=document.querySelectorAll('.characteristics__title')
        // const characteristicsDescription=document.querySelectorAll('.characteristics__description')

        // characteristicsTitle.forEach((elem,i)=>{
        //     elem.addEventListener('click',()=>{
        //         elem.classList.toggle('active')
        //         characteristicsDescription[i].classList.toggle('active')
        //     })
        // })
    } 

    const modal= () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy')
        cardDetailsButtonDelivery=document.querySelector('.card-details__button_delivery')
        const modal = document.querySelector('.modal')
        const cardDetailsTitle = document.querySelector('.card-details__title')
        const modalTitle= modal.querySelector('.modal__title')
        const modalSubtitle= modal.querySelector('.modal__subtitle')
        const modalTitleSubmit=modal.querySelector('.modal__title-submit')
        
        const openModal=(event)=>{
            const target=event.target
            modal.classList.add('open')
            document.addEventListener('keydown',escapeHandler)
            modalTitle.textContent=cardDetailsTitle.textContent
            modalTitleSubmit.value=cardDetailsTitle.textContent
            modalSubtitle.textContent=target.dataset.buttonBuy
        }

        const closeModal=()=>{
            modal.classList.remove('open')
            document.removeEventListener('keydown',escapeHandler)
        }

        const escapeHandler= event=>{
           if(event.code==='Escape'){
                modal.classList.remove('open')
            } 
        }

        modal.addEventListener('click',(event)=>{
            const target = event.target
            if(target.classList.contains('modal__close')||target===modal){
                closeModal()
            }
        })
        
        cardDetailsButtonBuy.addEventListener('click', openModal)

        cardDetailsButtonDelivery.addEventListener('click',openModal)
    }

    const renderCrossSell = () => {
        const crossSellList = document.querySelector('.cross-sell__list')

        const shuffle = arr => arr.sort(()=> Math.random()-0.5)

        const createCrossSellItem = ({photo,name,price}) => {
            const liItem = document.createElement('li')
            liItem.innerHTML=`
                <article class="cross-sell__item">
                    <img class="cross-sell__image" src="${photo}" alt="${name}">
                    <h3 class="cross-sell__title">${name}</h3>
                    <p class="cross-sell__price">${price}</p>
                    <button class="button button_buy cross-sell__button">Купить</и>
                </article>
            `
            return liItem
        }

        const createCrossSellList = (goods) => {
            const shuffleGoods = shuffle(goods)
            const fourItems = shuffleGoods.slice(0,4)
            fourItems.forEach(item => {
                crossSellList.append(createCrossSellItem(item))
            })
        }

        getData('cross-sell-dbase/dbase.json', createCrossSellList)
    }
    renderCrossSell()
    tabs()
    accordion()
    modal()
    amenu('.header__menu','.header-menu__list','.header-menu__item','.header-menu__burger')
})