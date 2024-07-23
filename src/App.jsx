import React from 'react';
import './App.css'
import { getUsersByFiltersRequest, getUsersRequest } from './requests';
import Table from './ui/table/Table';
import Modal from './ui/modal/Modal';

function App() {
    const [ users, setUsers ] = React.useState(null);
    const [ limit, setLimit ] = React.useState(30);
    const [ skip, setSkip ] = React.useState(0);
    const [ modalOpen, setModalOpen ] = React.useState(false);
    const [ modalInfo, setModalInfo ] = React.useState();
    const [ searchValue, setSearchValue ] = React.useState("");

    React.useEffect(() => {
        getUsersRequest(limit, skip)
            .then(setUsers);
        return () => setUsers(null);
    }, [limit, skip])

    React.useEffect(() => {
        if(searchValue !== "") {
            getUsersByFiltersRequest(limit, skip, searchValue)
               .then(setUsers)
        }
        else {
            getUsersRequest(limit, skip)
                .then(setUsers);
        }
        return () => setUsers(null);
    }, [limit, skip, searchValue])

    const tableOptions = [
        { key: "firstName", title: "ФИО", render: (item) => <>{item.firstName} {item.lastName} {item.maidenName}</> },
        { key: "age", title: "Возраст" },
        { key: "gender", title: "Пол" },
        { key: "phone", title: "Номер телефона" },
        { key: "role", title: "Адрес", render: (item) => <>{item.address.city}, {item.address.address}</> },
    ]

    const handlePaging = (type) => {
      if(type === 'plus') {
        setSkip(prev => prev + limit < users?.total ? prev + limit : prev)
      }
      if(type === 'minus') {
        setSkip(prev => prev - limit >= 0 ? prev - limit : prev)
      }
    }

    return (
        <React.Fragment>
            <Table
                tableOptions={tableOptions}
                data={users ? users.users : []}
                onClickItem={(item) => {setModalOpen(true); setModalInfo(item)}}
                renderFooter={() => (
                    <div className='footer'>
                        <div>
                            <input className={"inputSearch"} placeholder='Enter FirstName' value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                        </div>
                        <div className={"paginationWrapper"}>
                            <span>Страница: {skip/limit + 1}</span>
                            <button onClick={() => handlePaging('minus')}>-</button>
                            <button onClick={() => handlePaging('plus')}>+</button>
                        </div>  
                    </div>
                )}
            />
            {modalOpen && modalInfo && <Modal title={`${modalInfo.firstName} ${modalInfo.lastName} ${modalInfo.maidenName}`} onClose={() => setModalOpen(false)}>
                <div style={{color: 'black'}}>
                    <p><b>ФИО:</b> {`${modalInfo.firstName} ${modalInfo.lastName} ${modalInfo.maidenName}`}</p>
                    <p><b>Возраст:</b> {modalInfo.age}</p>
                    <p><b>Адрес:</b> {`${modalInfo.address.city}, ${modalInfo.address.address}`}</p>
                    <p><b>Рост:</b> {modalInfo.height}</p>
                    <p><b>Вес:</b> {modalInfo.weight}</p>
                    <p><b>Номер телефона:</b> {modalInfo.phone}</p>
                    <p><b>Email:</b> {modalInfo.email}</p>
                </div>
            </Modal>}
        </React.Fragment>
    )
}

export default App
