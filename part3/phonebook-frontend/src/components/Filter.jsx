const Filter = ({searchText,onChange}) => {
  return(
    <form>
      <div>
        <input onChange={onChange} value={searchText} />
      </div>
    </form>
  )
}

export default Filter