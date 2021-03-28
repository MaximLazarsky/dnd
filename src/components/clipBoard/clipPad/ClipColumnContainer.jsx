import { useState, useEffect } from "react";
import {addItem} from '../../../redux/actions/index'
import {changeColumnName} from '../../../redux/actions/'
import {useDispatch} from 'react-redux'
import ClipColumn from './ClipColumn'

export default function ClipColumnContainer({column, index, targetPad, clipPadName}) {

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenEditName, setIsOpenEditName] = useState(false)
    const [columnName, setColumnName] = useState(column.columnName)
    const [items, setItems] = useState(column.items)
    const dispatch = useDispatch()

    const onOpenHandler = () => setIsOpenModal(true)
    const onCloseHandler = () => setIsOpenModal(false)
    const targetListColumns = targetPad.columns.map((col)=>{
        if(col.columnName === columnName) {
            col.items = items
        }
        return col
    })

    const targetListColumnsChangedName = targetPad.columns.map((col)=>{
        if(col.id === column.id) {
            col.columnName = columnName
        }
        return col
    })
   
    const changedClipPad = {
        emailSettings: targetPad.emailSettings,
        isPrivate: targetPad.isPrivate,
        users: targetPad.users,
        columns: targetListColumns
    }

    const changedClipPadColumnName = {
        emailSettings: targetPad.emailSettings,
        isPrivate: targetPad.isPrivate,
        users: targetPad.users,
        columns: targetListColumnsChangedName
    }

    useEffect(()=>dispatch(addItem({clipPadName, changedClipPad})), [items])
     
    const onClickAddItem = () => {
        setItems([...items, 
            {
                id: `${Date.now()}`,
                itemTitle: "Unnamed",
                itemText: "Write your text here",
                img: null
            }
        ])
    }

    const onEditButtonHandler = () => {
        setIsOpenEditName(!isOpenEditName)
    }

    const onAcceptButtonHandler = () => {
        setIsOpenEditName(!isOpenEditName)
        dispatch(changeColumnName({clipPadName, changedClipPadColumnName}))
    }

    const onChangeName = (e) => setColumnName(e.target.value)
    
    const onClickCancelEdit = () => {
        setColumnName(column.columnName)
        setIsOpenEditName(!isOpenEditName)
    }

    return(<ClipColumn 
        onChangeName={onChangeName}
        onClickCancelEdit={onClickCancelEdit}
        onAcceptButtonHandler={onAcceptButtonHandler}
        onEditButtonHandler={onEditButtonHandler}
        onClickAddItem={onClickAddItem}
        onOpenHandler={onOpenHandler}
        onCloseHandler={onCloseHandler}
        index={index}
        isOpenModal={isOpenModal}
        isOpenEditName={isOpenEditName}
        columnName={columnName}
        items={items}
        columnId={column.id}
        />)
}