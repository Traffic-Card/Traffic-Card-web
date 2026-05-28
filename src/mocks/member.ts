import type { MemberDetailResponse } from '../types/api'

export const mockUser = {
  username: 'dongsong',
  password: 'pass1234',
}

export const mockMember: MemberDetailResponse = {
  memberId: 1,
  username: mockUser.username,
}
