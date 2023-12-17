import PageHeader from '@/app/[lang]/components/PageHeader';
import { fetchAPI } from '@/app/[lang]/utils/fetch-api';
import BlogList from '@/app/[lang]/views/blog-list';

async function fetchPostsByCategory(filter: string) {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/articles`;
        const urlParamsObject = {
            sort: { createdAt: 'desc' },
            filters: {
                articleCategory: {
                    slug: filter,
                },
            },
            populate: {
                cover: { fields: ['url'] },
                articleCategory: {
                    populate: '*',
                },
                authorsBio: {
                    populate: '*',
                },
            },
        };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI(path, urlParamsObject, options);
        console.log(responseData)
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

export default async function CategoryRoute({ params }: { params: { category: string } }) {

    const filter = params.category;
    
    const { data } = await fetchPostsByCategory(filter);
    console.log('response'+data);
    //TODO: CREATE A COMPONENT FOR THIS
    if (data.length === 0) return <div>Not Posts In this category</div>;

    const { name, description } = data[0]?.attributes.articleCategory.data.attributes;

    return (
        <div>
            <PageHeader heading={name} text={description} />
            <BlogList data={data} />
        </div>
    );
}

export async function generateStaticParams() {
    return [];
}
