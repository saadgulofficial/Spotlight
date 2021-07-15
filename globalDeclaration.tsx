
declare global {
  namespace NodeJS {
    interface Global {
      CommentActionSheet: any,
      NRef: any,
      commentNotify: any,
      reportPost: any
      filterPressed: any,
      notificationsBadge: any
    }
  }
}

const globalDeclaration = () => {
  return (
    null
  )
}

export default globalDeclaration
