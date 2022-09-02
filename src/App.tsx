import  { useState } from 'react';
import logo from './logo.svg';
import souce from './souce.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faRotateLeft, faChartBar, faCartShopping, faPlus} from '@fortawesome/free-solid-svg-icons'
import './App.css';

type itemType =  'list' | 'hestory' | 'stats';

const itemsWithCategory:Map<string,Array<string>> = new Map();

itemsWithCategory.set('cantegory1', ['item1','item2','item3','item1','item2','item3','item1','item2','item3']);
itemsWithCategory.set('cantegory2', ['item1','item2','item3','item1','item2','item3','item1','item2','item3']);
itemsWithCategory.set('cantegory3', ['item1','item2','item3','item1','item2','item3','item1','item2','item3']);
itemsWithCategory.set('cantegory4', ['item1','item2','item3','item1','item2','item3','item1','item2','item3']);
itemsWithCategory.set('cantegory5', ['item1','item2','item3','item1','item2','item3','item1','item2','item3']);

function App() {
  const [itemType, setActiveItem] = useState('list');
  const [sideBarContentType, setSideBarContentType] = useState('editItem');
  const [shippingList, showShippingList] = useState(false);
  const [newItem, changeNewItemState] = useState({name:'', note:'', imageUrl:'', category:''});
  const [itemList, setItemList] = useState(itemsWithCategory);
  const listHander = () => {
    setActiveItem('list');
    showShippingList(false);
  }
  const addItemHandler = () => {
    setSideBarContentType('addItem');
  }
  const changeNewItemHandler = (event:any, column:'name'|'category'|'imageUrl'|'note') => {
      const newItemLastState = {...newItem};
      newItemLastState[column]  = event.target.value;
      changeNewItemState(newItemLastState);
  }
  const addNewItem =  () => {
    //add new category if newItem has a new category 
    const newItemCategory = itemList.get(newItem.category);
    if(newItemCategory){
       newItemCategory.push(newItem.name);
       changeNewItemState({name:'', note:'', imageUrl:'', category:''});
    }else{
      itemList.set(newItem.category, [newItem.name]);
    }
    setItemList(new Map(itemList));
    console.log("item List : ", itemList)
  }
  return (
    <div className="App">
      <header className="header">
        <div className="logo" >
          <img src={logo} alt="logo" />
        </div>
        <div className="menu">
          <button className={`${itemType === 'list' ? 'activeButton': ''} btn btn-md  btn-light`} 
          onClick={() => listHander()}>
            <FontAwesomeIcon icon={faList} />
          </button>
          <button  className={`${itemType === 'hestory' ? 'activeButton' : ''} btn btn-md  btn-light`} 
          onClick={() => setActiveItem('hestory')}>
           <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button  className={`${itemType === 'stats' ? 'activeButton': ''} btn btn-md  btn-light`} 
          onClick={() => setActiveItem('stats')}>
            <FontAwesomeIcon icon={faChartBar} />
          </button>
        </div>
        <div className='cart'>
          <button  className='btn btn-sm  btn-warning text-white'>
            <span className='completedListCounter'>1</span>
            <FontAwesomeIcon icon={faCartShopping}/>
          </button>
        </div>
      </header>
      <div className='body'>
        <div className='itemPicker' style={{display: shippingList ? 'none' : 'block' }} >
            {Array.from(itemsWithCategory.keys()).map((category:string, index:number) => 
              <div key={index} >
                <h3 className='category'>{category}</h3>
                <div className='row itemList'>
                {itemList.get(category)?.map(item => 
                    <div className='col-md-3   col-6 item'>
                      <span>{item}</span>
                      <FontAwesomeIcon icon={faPlus} size="sm" color='' onClick={() => showShippingList(true)} />
                    </div>
                  )
                }
                </div>
              </div>
            )}
        </div>
        <div className='sideBar' style={{display: shippingList ? 'flex' : 'none' }}>
          <div className="shippingList" style={{display: sideBarContentType === 'editItem' ? 'flex' : 'none' }} >
            <div className="shippingListHeader">
              <img src={souce} alt="souce" />
              <div>
                <p>Didn't find what you <br/> need?</p>
                <button onClick={addItemHandler} >Add item</button>
              </div>
            </div>
            <div className='shippingListItems'></div>
            <div className='shippingListFooter'>
              <div className='shippingListName'>
                <input type="text" name="shippingList" placeholder='enter a name' />
                <button>Save</button>
              </div>
            </div>
          </div>
          <div className="addNewItem" style={{display: sideBarContentType === 'addItem' ? 'flex' : 'none' }}>
            <h3>Add a new item</h3>
            <form action="">
              <div className='form-group'>
                <label>Name</label>
                <input className='form-control' type="text" name="name" placeholder='Enter a name' 
                value={newItem.name}  onChange={(e) => changeNewItemHandler(e, 'name')}
                />
              </div>
              <div className='form-group'>
                <label>Note (optional)</label>
                <textarea className='form-control' placeholder='Enter a note' 
                value={newItem.note} onChange={(e) => changeNewItemHandler(e, 'note')}>
                </textarea>
              </div>
              <div className='form-group'>
                <label>Image (optional)</label>
                <input className='form-control' type="text" name="imageUrl" placeholder='Enter a url' 
                value={newItem.imageUrl} onChange={(e) => changeNewItemHandler(e, 'imageUrl')}/>
              </div>
              <div className='form-group'>
                <label>Category</label>
                <input className='form-control' type="text" name="category" placeholder='Enter a category' 
                value={newItem.category} onChange={(e) => changeNewItemHandler(e, 'category')}/>
                <div  className='categoryListAutoComplete'></div>
              </div>
              <div className='buttons'>
                <button className='btn'>cancel</button>
                <button className='btn save' onClick={addNewItem} type="button">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
