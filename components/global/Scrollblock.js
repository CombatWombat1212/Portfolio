function Scrollblock({ children, id }) {
  return <div className="scrollblock"
  
  {...(id != undefined ? { id: id } : {})}

  >{children}</div>;
}

export default Scrollblock;
