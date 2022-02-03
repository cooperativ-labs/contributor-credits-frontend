// index.tsx
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
// Import the useAuthStateHook
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(fireApp.auth());
  // console.log the current user and loading status
  console.log('Loading:', loading, '|', 'Current user:', user);

  return <div>Hello!</div>;
}

// @auth(
//  query: { rule: "query($id: String!) {
//            queryUser {
//                User(filter: { id: $id } ) {
//                    __typename
//                }
//            }
//        }" }
//   add: { rule: "query($userId: String!) {
//          queryEmail {
//              user(filter: { id: $userId } ) {
//                  __typename
//              }
//          }
//      }" }
//  update: { rule: "query($id: String!) {
//          queryUser {
//              User(filter: { id: $id } ) {
//                  __typename
//              }
//          }
//      }" }
//   query: { rule: "{ $NeverHere: { eq: \"anything\" } }" }
// )
