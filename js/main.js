const $form = document.querySelector('#novoItem')
const $lista = document.querySelector('#lista')
let itemLocal = JSON.parse(localStorage.getItem('item')) || []

$form.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const qtd = evento.target.elements['quantidade']

    const existe = itemLocal.find(elemento => elemento.nome == nome.value)

    const itemAtual = {
        'nome': nome.value,
        'quantidade': qtd.value
    }

    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
    }else{
        itemAtual.id = itemLocal[itemLocal.length - 1] ? (itemLocal[itemLocal.length - 1]).id + 1 : 0
        
        criaElemento(itemAtual)
        itemLocal.push(itemAtual)
    }

    localStorage.setItem('item', JSON.stringify(itemLocal))

    nome.value = ''
    qtd.value = ''
})

function iniciarPagina(){
    if(itemLocal == []){
        return
    }
    
    for(let item of itemLocal){
        criaElemento(item)
    }
}

iniciarPagina()

function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")
    
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))

    $lista.appendChild(novoItem)
}

function atualizaElemento(item){
    const itemExiste = document.querySelector(`[data-id='${item.id}']`)
    itemExiste.innerHTML = parseInt(itemExiste.innerHTML) + parseInt(item.quantidade)
    itemLocal[item.id].quantidade = itemExiste.innerHTML
}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button')
    elementoBotao.classList.add('botaoDelete')
    elementoBotao.innerText = 'X'
    elementoBotao.onclick = (e) => {
        e.path[1].remove()
        itemLocal = itemLocal.filter((item) => item.id != id)
        localStorage.setItem('item', JSON.stringify(itemLocal))
    }

    return elementoBotao
}