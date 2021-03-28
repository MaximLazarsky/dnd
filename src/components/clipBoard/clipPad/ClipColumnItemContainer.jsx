import { useState } from 'react'
import ClipColumnItem from './ClipColumnItem'

export default function ClipColumnItemContainer({item, index}) {

    const [itemTitle, setItemTitle] = useState(item.itemTitle)
    const [itemText, setItemText] = useState(item.itemText)
    const [isEditItem, setEditItemTitle] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const onChangeFile = (e) => console.log(e.target.files)
    const onChangeText = (e) => setItemText(e.target.value)
    const onChangeTitle = (e) => setItemTitle(e.target.value)
    const onCLickToggleEditItem = () => setEditItemTitle(!isEditItem)
    const onClickCancelEditItem = () => {
        setItemTitle(item.itemTitle)
        setItemText(item.itemText)
        setEditItemTitle(!isEditItem)
    }
    const onOpenHandler = () => setIsOpenModal(true)
    const onCloseHandler = () => setIsOpenModal(false)

    return(<ClipColumnItem 
            itemText={itemText} 
            onChangeFile={onChangeFile}
            onChangeText={onChangeText}
            onClickCancelEditItem={onClickCancelEditItem}
            index={index}
            item={item}
            isEditItem={isEditItem}
            onCLickToggleEditItem={onCLickToggleEditItem}
            isOpenModal={isOpenModal}
            onOpenHandler={onOpenHandler}
            onCloseHandler={onCloseHandler}
            itemTitle={itemTitle}
            onChangeTitle={onChangeTitle}
            />)
}