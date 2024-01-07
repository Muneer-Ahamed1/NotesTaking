import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import { editNotesByIdSlice, addNoteSlice } from "../../Dashboard/dashboardSlice"
import { getCategorySlice } from '../../Category/categorySlice'
function ProfileTemplate() {

    const [updateData, setUpdateData] = useState({});
    const dispatch = useDispatch();
    const id = useParams().id;
    console.log(updateData);

    useEffect(() => {
        dispatch(getCategorySlice());
    }, [])
    const categoryData = useSelector((state) => state.Category.category);

    function onSubmitData(e) {
        e.preventDefault();
        if (id) {
            console.log(updateData);
            dispatch(editNotesByIdSlice({ ...updateData, id }));
            setUpdateData({});
        }
        else {
            console.log(updateData)
            dispatch(addNoteSlice(updateData));

        }
    }

    return (

        <div className="updateProfile container mx-auto ">
            <h1 className=' md:text-2xl font-bold text-gray-700 text-center'>{(id) ? "Update  Note" : "Create  Note"}</h1>
            <form onSubmit={(e) => onSubmitData(e)} className=' p-3' >
                <div className="title">
                    <label for="tile" class="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Title' required="true" name="title" value={updateData["title"]} onChange={(e) => setUpdateData({ ...updateData, [e.target.name]: e.target.value })} />
                    {/* <p>{(updateData["title"] && updateData["title"].length > 0 ? "":"Please enter a title" )}</p> */}
                </div>
                <div className="description my-4" >
                    <label for="description" class="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder=' Description' required="true" name='description' onChange={(e) => setUpdateData({ ...updateData, [e.target.name]: e.target.value })}
                        value={updateData["description"]}
                    />

                </div>

                <div className="category">
                    <label for="category" class="block text-gray-700 text-sm font-bold mb-2">
                        Category
                    </label>

                    <p>{(updateData["category"] && updateData["category"].length == 0 ? "Please enter a category" : "")}</p>
                    <select name="category" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setUpdateData({ ...updateData, ["category"]: e.target.value })}
                    >
                        {categoryData && categoryData.map((vl) => {
                            const { _id, category } = vl
                            return (
                                <option key={_id} value={category}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >{category}</option>
                            )
                        })}

                    </select>

                </div>

                <button className=' px-4 py-2 rounded-md bg-green-700 hover:bg-green-500 text-white my-4' type='submit' >{(id) ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default ProfileTemplate