function Card({ coldata }) {
    return (
        <div style={{ display: "flex",
            padding: "10px",
        flexWrap:"wrap",
        alignContent:"center",
        justifyContent:"center"
        }}>
        {coldata.slice(0, 50).map((item, index) => (
          
            <div key={item.id} style={{ display: "flex",
        height: "200px",
        width: "200px",
        padding: "10px",
        flexWrap:"wrap",
        alignContent:"center",
        justifyContent:"center"
        }} >
            <img src={item.thumbnailUrl} alt={item.title}  />
          </div>
        ))}
      </div>
    );
  }
export default Card