const data = {
    "services": [
        {
            "id": 1,
            "head": null,
            "name": "Проф.осмотр",
            "node": 0,
            "price": 100.0,
            "sorthead": 20
        },
        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8 зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургическое вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        },

    ]
}

Promise.resolve(data)
    .then(res => {
        document.querySelector("#Data-Tree").innerHTML = renderDataTree(createDataTree(data));
    });


// const url = ""; 

// fetch(url)
//     .then(res => res.json())
//     .then(res => document.querySelector("#Data-Tree").innerHTML = renderDataTree(createDataTree(res)))
//     .catch(err => new Error(err));


function createDataTree(data, parent = null){
    const dataBranch = [];

    for(let i = 0; i < data.services.length; i++){
        if(parent != data.services[i].head){
            continue;
        }

        const branch = data.services[i];

        if(data.services[i].node == 1){
            branch.children = createDataTree(data, data.services[i].id)
        }
        
        dataBranch.push(branch);
    }

    dataBranch.sort((a, b) => a.sorthead - b.sorthead);

    return dataBranch;
}

function renderDataTree(nodeDataTree){
    let node = "<ul>";

    for(let i = 0; i < nodeDataTree.length; i++){
        let price = nodeDataTree[i].price == 0 ? '' : `(${nodeDataTree[i].price})`;

        node += `<li>${nodeDataTree[i].name} ${price}`;

        if(nodeDataTree[i].hasOwnProperty("children")){
            node += renderDataTree(nodeDataTree[i].children);
        }

        node += "</li>";
    }

    node += "</ul>";

    return node;
}
