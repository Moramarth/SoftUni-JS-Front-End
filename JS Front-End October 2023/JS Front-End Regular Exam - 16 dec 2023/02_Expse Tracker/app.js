window.addEventListener("load", solve);

function solve() {
    const previewList = document.querySelector('#preview-list')
    const confirmedList = document.querySelector('#expenses-list')
    const deleteBtn = document.querySelector('.btn.delete')
    deleteBtn.addEventListener('click', refreshApp)


    // input fields
    const expenseInput = document.querySelector('#expense');
    const amountInput = document.querySelector('#amount');
    const dateInput = document.querySelector('#date');

    const addBtn = document.querySelector('#add-btn');
    addBtn.addEventListener('click', addExpense)

    function addExpense(event) {
        event.preventDefault()

        const expenseType = expenseInput.value;
        const amount = amountInput.value;
        const date = dateInput.value;

        if (!expenseType || !amount || !date) return;
        

        const listElement = document.createElement('li')
        listElement.classList.add('expense-item')


        const articleElement = document.createElement('article')

        const typeParagraph = document.createElement('p')
        typeParagraph.textContent = `Type: ${expenseType}`

        const amountParagraph = document.createElement('p')
        amountParagraph.textContent = `Amount: ${amount}$`

        const dateParagraph = document.createElement('p')
        dateParagraph.textContent = `Date: ${date}`

        articleElement.appendChild(typeParagraph)
        articleElement.appendChild(amountParagraph)
        articleElement.appendChild(dateParagraph)


        const btnWrapperElement = document.createElement('div')
        btnWrapperElement.classList.add('buttons')

        const editBtnElement = document.createElement('button')
        editBtnElement.classList.add('btn')
        editBtnElement.classList.add('edit')
        editBtnElement.textContent = 'edit'
        editBtnElement.addEventListener('click', editExpense)

        const okBtnElement = document.createElement('button')
        okBtnElement.classList.add('btn')
        okBtnElement.classList.add('ok')
        okBtnElement.textContent = 'ok'
        okBtnElement.addEventListener('click', confirmExpense)

        btnWrapperElement.appendChild(editBtnElement)
        btnWrapperElement.appendChild(okBtnElement)

        listElement.appendChild(articleElement)
        listElement.appendChild(btnWrapperElement)

        addBtn.disabled = true

        clearInputFields()

        previewList.appendChild(listElement)
     
        function editExpense() {
            expenseInput.value = expenseType
            amountInput.value = amount
            dateInput.value = date

            listElement.remove()

            addBtn.disabled = false
        }

        function confirmExpense() {
            listElement.remove()
            confirmedList.appendChild(listElement)

            btnWrapperElement.remove()

            addBtn.disabled = false
        }
    }

    function clearInputFields() {
        expenseInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
    }
    function refreshApp() {
        window.location.reload()
    }
}