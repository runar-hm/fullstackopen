const Filter = ({searchText,onChange}) => {
  return(
    <form>
      <div>
        {searchText}<input onChange={onChange} />
      </div>
    </form>
  )
}

export default Filter