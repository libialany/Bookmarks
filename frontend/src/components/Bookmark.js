import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
function Bookmark() {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [links, setLinks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('');
    useEffect(() => {
        getBookmarks()
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            const res = await fetch(`/update_bookmark/${id}`,
                {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        link,
                        name
                    })
                })
            await res.json();
            setId('')
            setEdit(false)
        } else {
            const res = await fetch('/add_bookmark',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        link,
                        name
                    })
                })
            await res.json();   
        }
        await getBookmarks();
        setLink('')
        setName('')
    }
    const getBookmarks = async () => {
        const res = await fetch('/bookmarks', {
            method: 'GET',
            mode: 'cors'
        })
        const data = await res.json();
        setLinks(data);
    }
    const deleteLink = async (id) => {
        const userResponse = window.confirm("Are you sure you want to delete it?");
        if (userResponse) {
            const res = await fetch(`/delete_bookmark/${id}`, {
                method: "DELETE",
            });
            await res.json();
            await getBookmarks();
        }
    };

    const editLink = async (id) => {
        const res = await fetch(`/bookmark/${id}`, {
            method: 'GET',
            mode: 'cors'
        });
        const data = await res.json();

        setEdit(true);
        setId(id);

        // Reset
        setName(data.name);
        setLink(data.link);
        // nameInput.current.focus();
    };
    const handleLink = event => {
        setLink(event.target.value)
    }
    const handleName = event => {
        setName(event.target.value)
    }
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" className="link"
                                        onChange={handleLink}
                                        placeholder="Link"
                                        value={link}
                                        autoFocus
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="name"
                                        onChange={handleName}
                                        placeholder="Name"
                                        value={name}
                                        autoFocus
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <button type="submit" className="btn btn-outline-secondary">
                                    {edit?"Update":"Create"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*  TABLE  */}
                <div className="col-md-7">
                    <h1>BOOKMARKS</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>link</td>
                                <td>Operation</td>
                            </tr>
                        </thead>
                        <tbody>
                            {links.map(_link => (
                                <tr key={uuid()}>
                                    <td>{_link.name}</td>
                                    <td>{_link.link}</td>
                                    <td>
                                        <Link className="btn btn-info"
                                            onClick={(e) => editLink(_link.id)}
                                        > Edit</Link>
                                        <Link className="btn btn-danger"
                                            onClick={(e) => deleteLink(_link.id)}> Delete </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* END TABLE */}
            </div>
        </div>
    )
}

export default Bookmark
