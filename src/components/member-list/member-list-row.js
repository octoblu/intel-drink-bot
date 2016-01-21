import classNames from 'classnames'
import React, { PropTypes } from 'react'

import Button from '../button'
import TableRow from '../table/row'

const MemberListRow = ({ authenticatedUuid, member, onDeleteMember, className }) => {
  let deleteBtn = <Button
    onClick={() => onDeleteMember(member)}
    loading={member.deleting}
    loadingLabel="Deleting..."
    disabled={member.deleting}
    kind="hollow-danger"
    size="small">
    Delete
  </Button>

  if (authenticatedUuid == member.uuid) deleteBtn = null

  const componentClass = classNames(
    {'MemberListRow--error': member.error},
    className
  )

  return <TableRow className={componentClass}>
    <td>{member.email}</td>
    <td>{member.status}</td>
    <td>{deleteBtn}</td>
  </TableRow>
}

MemberListRow.propTypes = {
  authenticatedUuid: PropTypes.string.isRequired,
  member: PropTypes.object.isRequired,
  onDeleteMember: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default MemberListRow
