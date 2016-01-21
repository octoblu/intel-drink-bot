import React, { PropTypes } from 'react';
import TableRow from '../table/row';
import Button from '../button/'
import { Link } from 'react-router';

const DeviceListRow = ({ device, onDeleteDevice, orgId }) => {
  const genericType = "other"
  const octobluDeviceDetailUrl = `https://app.octoblu.com/device/${device.uuid}`
  return (
    <TableRow>
      <td>
        <Link to={`/${orgId}/devices/${device.uuid}`}>{device.name}</Link>
      </td>

      <td>
        <a href={octobluDeviceDetailUrl} title="View Device in Octoblu" target="_blank">{device.uuid}</a>
      </td>

      <td>{device.type || genericType}</td>

      <td>
        <Button
          onClick={() => onDeleteDevice(device.uuid)}
          loading={device.deleting}
          loadingLabel="Deleting..."
          disabled={device.deleting}
          kind="hollow-danger"
          size="small">
          Delete
        </Button>
      </td>
    </TableRow>
  )
};

DeviceListRow.propTypes = {
  device: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  onDeleteDevice: PropTypes.func.isRequired
}

export default DeviceListRow
