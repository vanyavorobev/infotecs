
const getUsersRequest = async (limit, skip) => {
    return fetch(buildUrl(limit, skip))
        .then(res => res.json());
}

const buildUrl = (limit, skip) => {
    let url = 'https://dummyjson.com/users';

    if(limit && skip) url += `?limit=${limit}&skip=${skip}`;
    else if(limit) url += `?limit=${limit}`;
    else if(skip) url += `?skip=${skip}`;

    return url;
}

export default getUsersRequest;