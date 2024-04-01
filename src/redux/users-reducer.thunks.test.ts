import {actions, follow, unfollow} from './users-reducer'
import {usersAPI} from '../api/users-api.ts'
import {APIResponseType, ResultCodesEnum} from '../api/api.ts'

jest.mock('../api/users-api.ts')
const userAPIMock = usersAPI as jest.MaybeMocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
})


const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}




test('success follow thunk', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result));
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})

test('success unfollow thunk', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result));
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})
