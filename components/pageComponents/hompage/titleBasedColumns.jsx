import CardList from "../ProductCardList";

export default function ProdCategories({title, catlist}){
    return(
        <div className="flex-col">
            <div className="mb-7">
                <p className="font-medium text-2xl">{title}</p>
            </div>
            <div className="mb-7">
                <hr />
            </div>

            <div className="mb-7">
                {catlist}
            </div>
        </div>
    )
}