import { CKBCell, DAOCell, iCKBCell, LiveCells } from "@/app/models/NormalCell";
import { TestData } from "@/client/TestData";
import { parseCapacity } from "./stringUtils";

export class ExplorerUtils {
    static countPerPage: number = 20;

    static async getLiveCells(address: string, page: number = 1): Promise<LiveCells> {
        //https://mainnet-api.explorer.nervos.org/api/v1/address_live_cells/ckb1qzdcr9un5ezx8tkh03s46m9jymh22jruelq8svzr5krj2nx69dhjvqgjn6kfkeu23q74kndpaxw42z77vgat6v86qq6z03rf?page=3&page_size=10&sort=capacity.desc
        //const uri = `/api/explorer/v1/address_live_cells/${address}?page=${page}&page_size=20&sort=capacity.desc`;
        const uri = `https://mainnet-api.explorer.nervos.org/api/v1/address_live_cells/${address}?page=${page}&page_size=20&sort=capacity.desc`;
        const result: LiveCells = new LiveCells();

        let cells: any;
        try {
            const response = await fetch(uri, {
                method: "GET",
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },
            });

            if (!response || !response.ok) {
                //throw new Error(`Error fetching data: ${response.statusText}`);
                cells = TestData.explorerData.data;
            }
            else {
                const json = await response.json();
                cells = json.data;
            }
        } catch (error) {
            console.error('Failed to get live cells:', error);
            cells = TestData.explorerData.data;
        }

        for (const cell of cells) {
            const cellData = cell.attributes;
            switch (cellData.cell_type) {
                case 'normal':
                    const ckbCell = new CKBCell();
                    ckbCell.capacity = cellData.capacity;
                    ckbCell.tx_hash = cellData.tx_hash;
                    ckbCell.cell_index = cellData.cell_index;
                    ckbCell.block_number = cellData.block_number;
                    ckbCell.block_timestamp = cellData.block_timestamp;
                    ckbCell.occupied_capacity = cellData.occupied_capacity;
                    ckbCell.balanceStr = cellData.capacity;
                    ckbCell.balance = parseCapacity(cellData.capacity);
                    result.ckbCells.push(ckbCell);
                    break;
                case 'nervos_dao_deposit':
                    const daoCell = new DAOCell();
                    daoCell.capacity = cellData.capacity;
                    daoCell.tx_hash = cellData.tx_hash;
                    daoCell.cell_index = cellData.cell_index;
                    daoCell.block_number = cellData.block_number;
                    daoCell.block_timestamp = cellData.block_timestamp;
                    daoCell.occupied_capacity = cellData.occupied_capacity;
                    daoCell.balanceStr = cellData.capacity;
                    daoCell.balance = parseCapacity(cellData.capacity);
                    result.daoCells.push(daoCell);
                    break;
                case 'xudt':
                    if (cellData.extra_info.symbol == "iCKB" || cellData.type_hash == "0xd485c2271949c232e3f5d46128336c716f90bcbf3cb278696083689fbbcd407a") {
                        const ickbCell = new iCKBCell();
                        ickbCell.capacity = cellData.capacity;
                        ickbCell.tx_hash = cellData.tx_hash;
                        ickbCell.cell_index = cellData.cell_index;
                        ickbCell.block_number = cellData.block_number;
                        ickbCell.block_timestamp = cellData.block_timestamp;
                        ickbCell.occupied_capacity = cellData.occupied_capacity;
                        ickbCell.balanceStr = cellData.extra_info.amount;
                        ickbCell.balance = parseCapacity(cellData.extra_info.amount);
                        result.ickbCells.push(ickbCell);
                    }
                    break;
                // Add cases for other cell types like 'udt' for iCKB if needed
            }
        }

        return result;
    }
}