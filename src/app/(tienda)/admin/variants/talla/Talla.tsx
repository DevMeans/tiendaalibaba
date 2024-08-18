
export const TallaComponent = () => {
    return (
        <div className="">
            <span>Tallas</span>
            <button className="ml-3 p-1 bg-black text-white rounded">
                Nueva talla
            </button>
            <table className="border mt-5">
                <thead className="bg-black text-white text-left">
                    <tr>
                        <th className="w-16">
                            id
                        </th>
                        <th className="">
                            Nombre
                        </th>
                        <th>
                            estado
                        </th>
                        <th>
                            eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            id
                        </td>

                        <td>
                            Nombre
                        </td>

                        <td>
                            Estado
                        </td>
                        <td>
                            eliminar
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}