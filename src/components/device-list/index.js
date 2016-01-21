import _ from 'lodash'
import React, { PropTypes } from 'react'

import DeviceListRow from './device-list-row'
import NoDevices from './no-devices'
import Table from '../table/table'
import TableRow from '../table/row'
import Loading from '../loading'

import 'suitcss-utils';
import './index.css';

const DeviceList = ({ devices, fetching, onDeleteDevice, orgId }) => {
  const rows = _.map(devices, (device) =>
    <DeviceListRow
      device={device}
      key={device.uuid}
      orgId={orgId}
      onDeleteDevice={onDeleteDevice}/>
  );

  if (fetching) return <Loading message="Loading Devices..." />
  if (_.isEmpty(devices) && !fetching) return <NoDevices/>

  return (
    <div>
      <Table>
        <thead>
          <TableRow>
            <th className="u-textLeft">Name</th>
            <th className="u-textLeft">UUID</th>
            <th className="u-textLeft">Type</th>
          </TableRow>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
  )
};

DeviceList.propTypes = {
  devices: PropTypes.array,
  fetching: PropTypes.bool.isRequired,
  orgId: PropTypes.string.isRequired,
  onDeleteDevice: PropTypes.func.isRequired,
}

export default DeviceList
