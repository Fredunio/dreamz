import FormLayout from '../components/layout/forms/FormLayout'

import * as React from 'react'

import AddDreamForm from './AddDreamForm'

const editor_api_key = process.env.NEXT_PUBLIC_TINY_API_KEY

export default function AddDreamPage() {
    return (
        <FormLayout title="Add Dream ✨">
            <AddDreamForm />
        </FormLayout>
    )
}
