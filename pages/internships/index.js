import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import InfiniteScroll from 'react-infinite-scroll-component'

import { InternshipsApi } from '../../api/internship'
import AuthContext from '../../components/auth/AuthContext'
import Desktoplayout from '../../components/layout/layout'
import Internshipcard from '../../components/internshipcard'
import { Sectionloader } from '../../components/loader'

const Internships = () => {
    const router = useRouter()

    const { token } = useContext(AuthContext)
    const internApi = useMemo(() => new InternshipsApi(token), [token])

    const [hasMore, setHasMore] = useState(true)
    const [internships, setInternships] = useState([])

    const chunkSize = 10

    const fetchNextInternships = async () => {
        let data = await internApi.fetchInternshipsList(
            internships.length,
            chunkSize
        )
        setInternships([...internships, ...data])
        if (data.length < chunkSize) setHasMore(false)
    }

    useEffect(() => {
        token && fetchNextInternships()
    }, [internApi])

    return (
        <Desktoplayout>
            <div
                className="d-flex justify-content-start mt-4 tw-flex-wrap"
                style={{ marginLeft: '5%', marginRight: '45px' }}
            >
                <button
                    style={{
                        borderWidth: '0px',
                        color: 'white',
                        backgroundColor: '#5a52b7',
                        fontSize: '14px',
                        height: '42px',
                        width: '130px',
                        borderRadius: '8px',
                    }}
                    onClick={(event) => {
                        event.preventDefault()
                        router.push('/internships/create')
                    }}
                >
                    <span className="me-2">Create</span>
                    <AiOutlinePlus size={16} color="white" strokeWidth={40} />
                </button>
            </div>
            <InfiniteScroll
                dataLength={internships.length}
                next={fetchNextInternships}
                hasMore={hasMore}
                style={{
                    height: '100%',
                    overflow: 'hidden',
                    marginBottom: '20px',
                }}
                loader={
                    <div style={{ textAlign: 'center' }}>
                        <Sectionloader py={5} />
                    </div>
                }
                scrollThreshold={1}
            >
                <div className="internship-cards mt-4">
                    {internships.map((internship) => {
                        return (
                            <Internshipcard
                                key={internship.id}
                                internship={internship}
                            />
                        )
                    })}
                </div>
            </InfiniteScroll>
            <style jsx>{`
                .get-verified {
                    margin-left: 5%;
                    margin-right: auto;
                    text-align: end;
                }
                .internship-cards {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px;
                    max-width: 1420px;
                    padding: 0px 20px 0px 0px;
                    margin-left: 5%;
                }
            `}</style>
        </Desktoplayout>
    )
}

export default Internships
