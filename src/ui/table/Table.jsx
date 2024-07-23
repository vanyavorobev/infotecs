import React from "react"
import PropTypes from 'prop-types';
import './Table.css';

const Table = (props) => {
    const { tableOptions, data, onClickItem, renderFooter } = props;

    return (
        <table className={'tableWrapper'}>
            <thead className={'tableHeader'}>
                <tr>
                    {tableOptions.map(it => (
                        <th className={"tableCell"} key={it.key}>{it.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((it) => (
                    <tr className={'tableRow'} key={it.id} onClick={() => onClickItem(it)}>
                        {tableOptions.map(options => (
                            <td className={"tableCell"} key={options.key}>{options.render ? options.render(it) : it[options.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                {renderFooter()}
            </tfoot>
        </table>
    )
}

Table.propTypes = {
    tableOptions: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onClickItem: PropTypes.func,
    renderFooter: PropTypes.func
}

export default Table;