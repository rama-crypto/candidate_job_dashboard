import {
    AiFillLinkedin,
    AiFillGithub,
    AiFillInstagram,
    AiFillFacebook,
    AiFillMediumCircle,
} from 'react-icons/ai'
import { BsSnapchat } from 'react-icons/bs'
import { FaDev } from 'react-icons/fa'

const SOCIALMEDIALINKS = [
    {
        link: 'https://linkedin.com/',
        icon: AiFillLinkedin,
    },
    {
        link: 'https://github.com/',
        icon: AiFillGithub,
    },
    {
        link: 'https://instagram.com/',
        icon: AiFillInstagram,
    },
    {
        link: 'https://facebook.com/',
        icon: AiFillFacebook,
    },
    {
        link: 'https://snapchat.com/',
        icon: BsSnapchat,
    },
    {
        link: 'https://dev.to/',
        icon: FaDev,
    },
    {
        link: 'https://medium.com/',
        icon: AiFillMediumCircle,
    },
]

const ICONSREPO = {
    linkedin: {
        icon: AiFillLinkedin,
    },
    github: {
        icon: AiFillGithub,
    },
    instagram: {
        icon: AiFillInstagram,
    },
    facebook: {
        icon: AiFillFacebook,
    },
    snapchat: {
        icon: BsSnapchat,
    },
    dev: {
        icon: FaDev,
    },
    medium: {
        icon: AiFillMediumCircle,
    },
}

export { ICONSREPO }

export default SOCIALMEDIALINKS
