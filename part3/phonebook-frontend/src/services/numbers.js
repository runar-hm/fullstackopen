import axios from 'axios'

const baseUrl = '/api/people'

const getAll = () => {
axios
    const request = axios.get(baseUrl)
    
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)

    return(request
        .then(response => response.data)
    )
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)

    return(request
        .then(response => response.data)
        .catch(error => {`Error: ${error}`})
    )
}

const update = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`,person)

    return(request
        .then(response => response.data)
    )
}

export default { create, getAll, remove, update }