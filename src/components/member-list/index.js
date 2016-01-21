import _ from 'lodash'
import React, { PropTypes } from 'react'

import MemberListRow from './member-list-row'
import Alert from '../alert'

import Table from '../table/table'
import TableRow from '../table/row'

import 'suitcss-utils'
import './index.css'

const MemberList = ({ members, authenticatedUuid, onDeleteMember }) => {
  const rows = _.map(members, (member) =>
    <MemberListRow
      member={member}
      authenticatedUuid={authenticatedUuid}
      onDeleteMember={onDeleteMember}
      key={member.memberId}/>
  )

  return (
    <div>
      <Table>
        <thead>
          <TableRow>
            <th className="u-textLeft">Email</th>
            <th className="u-textLeft">Status</th>
            <th></th>
          </TableRow>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
  )
}

MemberList.propTypes = {
  members: PropTypes.array.isRequired,
  authenticatedUuid: PropTypes.string.isRequired,
  onDeleteMember: PropTypes.func.isRequired
}

export default MemberList
