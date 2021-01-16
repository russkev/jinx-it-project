
import copy
import uuid
import tempfile
from typing import OrderedDict

from PIL import Image

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files.images import ImageFile

from rest_framework.test import APITestCase

from account.models import Account

from . import models
from . import serializers


class UserMixin():
    def setUpUser(self):
        self.user = User.objects.create_user(
            username='bertrand',
            password='elaboratestillness',
            email='bertrand@example.com',
        )
        self.client.force_authenticate(user=self.user)


class PortfolioMixin():
    def setUpPortfolio(self):
        self.portfolio = models.Portfolio.objects.create(
            owner=self.user,
            name='cuttlefish')
        # PAGES
        self.pages = []
        for i in range(10):
            page = models.Page.objects.create(
                portfolio=self.portfolio,
                name='page number {}'.format(i),
                index=i
            )
            if i == 0:
                self.page = page
            self.pages.append(page)
        # SECTIONS
        self.sections = []
        for i in range(10):
            section = models.Section.objects.create(
                page=self.page,
                name='section number {}'.format(i),
                index=i,
                text='lorem ipsum'
            )
            if i == 0:
                self.section = section
            self.sections.append(section)
        # SECTION LINKS
        self.section_links = []
        for i in range(10):
            section_link = models.SectionLink.objects.create(
                id=uuid.uuid4(),
                name='link number {}'.format(i),
                icon=i,
                address="http://link.com",
                index=i,
                section=self.section,
            )
            # section_link = models.SectionLink.objects.create(
            #     link=link,
            #     section=self.section
            # )
            if i == 0:
                self.section_link = section_link
            self.section_links.append(section_link)
        # PORTFOLIO LINKS
        self.portfolios = []
        for i in range(10):
            portfolio_link = models.PortfolioLink.objects.create(
                id=uuid.uuid4(),
                name='link number {}'.format(i),
                icon=i,
                address="http://link.com",
                index=i,
                portfolio=self.portfolio
            )
            if i == 0:
                self.portfolio_link = portfolio_link
            self.portfolios.append(portfolio_link)

################################################################################
# PORTFOLIO
################################################################################


class PortfolioTest(UserMixin, PortfolioMixin, APITestCase):
    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        self.setUpUser()
        self.setUpPortfolio()

    def test_portfolio_create(self):
        name = 'fasting pumice'
        data = {
            'name': name,
            'links': [],
            }
        response = self.client.post(
            reverse('portfolio_list'),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('name'), name)

        portfolio = models.Portfolio.objects.get(id=response.data.get('id'))
        self.assertEqual(portfolio.owner, self.user)
        self.assertEqual(portfolio.name, name)
        self.assertEqual(portfolio.pages.count(), 0)

    def test_portfolio_validation(self):
        name = 'a' * 101
        data = {'name': name}
        response = self.client.post(
            reverse('portfolio_list'),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 400)

    def test_portfolio_retrieve(self):
        response = self.client.get(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id
                }
            ),
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(str(self.portfolio.id), response.data['id'])
        self.assertEqual(self.portfolio.owner.id, response.data['owner'])
        self.assertEqual(self.portfolio.name, response.data['name'])
        self.assertEqual(10, len(response.data['pages']))
        self.assertEqual(self.portfolio.private, response.data['private'])
        self.assertEqual(self.portfolio.theme, None)
        self.assertEqual(self.portfolio.background, None)

    def test_portfolio_update(self):
        name = 'incontrovertible bisections'
        expected_id = str(self.portfolio.id)
        response = self.client.patch(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                }
            ),
            {'name': name},
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('name'), name)
        self.assertEqual(expected_id, response.data['id'])

        # clear out cached data
        self.portfolio.refresh_from_db()

        self.assertEqual(self.portfolio.owner, self.user)
        self.assertEqual(self.portfolio.name, name)

    def test_portfolio_update_with_links(self):
        update_link_data = {
            'id': self.portfolio_link.id,
            'name': 'facebook',
            'address': 'http://facebook.com',
            'icon': 4,
            'number': 0,
        }
        data = {
            'name': self.portfolio.name,
            'links': [
                update_link_data,
                {
                    'id': str(uuid.uuid4()),
                    'name': 'github',
                    'address': 'http://github.com',
                    'icon': 5,
                    'index': 1,
                }
            ]
        }
        response = self.client.put(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id
                }
            ),
            data,
            format='json'
        )
        self.assertEqual(response.status_code, 200)
        
        updated_link = models.PortfolioLink.objects.get(
            id = self.portfolio_link.id)
        all_links = models.PortfolioLink.objects.filter(
            portfolio = self.portfolio.id
        )
        
        self.assertEqual(len(all_links), 2)
        self.assertEqual(len(response.data['links']), 2)
        self.assertEqual(updated_link.name, update_link_data['name'])
        self.assertEqual(updated_link.address, update_link_data['address'])

    def test_portfolio_delete(self):
        response = self.client.delete(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                }
            )
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            len(models.Portfolio.objects.filter(id=self.portfolio.id)),
            0
        )

################################################################################
# PAGE
################################################################################


class PageTest(UserMixin, PortfolioMixin, APITestCase):
    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        self.setUpUser()
        self.setUpPortfolio()

    def test_page_create(self):
        name = 'deteriorating tubes'
        data = {
            'id': str(uuid.uuid4()),
            'name': name,
            'index': 11,
            'sections': [],
            'links': []
        }
        response = self.client.post(
            reverse('page_list', kwargs={
                'portfolio_id': self.portfolio.id,
            }),
            data,
            format='json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('name'), name)

        page = models.Page.objects.get(id=response.data.get('id'))
        self.assertEqual(page.portfolio, self.portfolio)
        self.assertEqual(page.name, name)
        self.assertEqual(page.sections.count(), 0)

    def test_page_validation(self):
        name = 'a' * 101
        data = {'name': name}
        response = self.client.post(
            reverse('page_list', kwargs={'portfolio_id': self.portfolio.id}),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 400)

    def test_page_retrieve(self):
        response = self.client.get(
            reverse(
                'page_detail',
                kwargs={
                    'page_id': self.page.id
                }
            )
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], str(self.page.id))
        self.assertEqual(response.data['name'], self.page.name)
        self.assertEqual(response.data['index'], 0),
        self.assertEqual(len(response.data['sections']), 10)

    def test_page_update(self):
        name = 'soggiest contrivances'
        response = self.client.patch(
            reverse(
                'page_detail',
                kwargs={
                    'page_id': self.page.id,
                }
            ),
            {'name': name},
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('name'), name)

        # clear out cached data
        self.page.refresh_from_db()

        self.assertEqual(self.page.portfolio, self.portfolio)
        self.assertEqual(self.page.name, name)

    def test_page_delete(self):
        response = self.client.delete(
            reverse(
                'page_detail',
                kwargs={
                    'page_id': self.page.id
                }
            )
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            len(models.Page.objects.filter(id=self.page.id)),
            0
        )


class PageNestTest(UserMixin, PortfolioMixin, APITestCase):
    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        self.setUpUser()
        self.setUpPortfolio()

    def test_page_nest_update(self):
        # Do updates and new additions of sections and links all at once
        original_uuid = str(self.section.id)
        new_section_id = str(uuid.uuid4())
        update_link_data = {
            'address': 'http://facebook.com',
            'icon': 4,
            'id': self.section_link.id,
            'number': 0,
            'name': 'facebook'
        }
        data = {
            'name': 'Home page',
            'sections': [
                {
                    'name': 'About me',
                    'index': 0,
                    'type': 'text',
                    'text': 'lorem ipsum',
                    'id': self.section.id,
                    'links': [
                        update_link_data,
                        {
                            'address': 'http://github.com',
                            'icon': 5,
                            'id': str(uuid.uuid4()),
                            'number': 1,
                            'name': 'github'
                        },
                        {
                            'address': 'http://youtube.com',
                            'icon': 5,
                            'id': str(uuid.uuid4()),
                            'number': 1,
                            'name': 'github'
                        }
                    ]
                },
                {
                    'name': 'Contact',
                    'index': 1,
                    'type': 'text',
                    'text': 'lorem two',
                    'id': new_section_id,
                    'links': [
                        {
                            'address': 'http://facebook.com',
                            'icon': 4,
                            'id': str(uuid.uuid4()),
                            'number': 0,
                            'name': 'facebook'
                        },
                        {
                            'address': 'http://github.com',
                            'icon': 5,
                            'id': str(uuid.uuid4()),
                            'number': 1,
                            'name': 'github'
                        }
                    ]
                },
            ]
        }
        response = self.client.put(
            reverse(
                'page_detail',
                kwargs={
                    'page_id': self.page.id
                }
            ),
            data,
            format='json'
        )
        self.assertEqual(response.status_code, 200)
        updated_link = models.SectionLink.objects.get(id=self.section_link.id)
        updated_link_response = response.data['sections'][0]['links'][0]
        self.assertEqual(updated_link_response['id'], str(updated_link.id))
        self.assertEqual(updated_link.name, update_link_data['name'])
        self.assertEqual(
            len(models.Section.objects.filter(page=self.page.id)), 2)
        self.assertEqual(
            len(models.SectionLink.objects.filter(section=self.section.id)), 3)
        self.assertEqual(
            len(models.SectionLink.objects.filter(section=new_section_id)), 2)
        self.assertEqual(response.data['sections'][0]['id'], original_uuid)
        self.assertEqual(len(response.data['sections']), 2)
        self.assertEqual(len(response.data['sections'][0]['links']), 3)
        self.assertEqual(len(response.data['sections'][1]['links']), 2)

    def test_section_list_retrieve(self):
        response = self.client.get(
            reverse(
                'section_list',
                kwargs={
                    'page_id': self.page.id,
                }
            ),
        )
        self.assertEqual(len(response.data), 10)
        for i, section in enumerate(response.data):
            instance = self.sections[i]
            self.assertEqual(instance.name, section.get('name'))
            self.assertEqual(instance.index, section.get('index'))
            self.assertEqual(instance.index, i)
            self.assertTrue('type' in section)
            if section['type'] == 'text':
                self.assertEqual(instance.text, section.get('text'))

    def test_section_update(self):
        path = reverse(
            'page_detail',
            kwargs={
                'page_id': self.page.id,
            }
        )

        model = {
            'id': str(self.page.id),
            'name': 'Home Page',
            'index': 0,
            'sections': []
        }

        with self.subTest(msg='delete everything'):
            self.client.put(
                path,
                {
                    'name': 'Home Page',
                    'sections': []
                },
                format='json'
            )
            response = self.client.get(path)

            self.assertEqual(response.json(), model)

        with self.subTest(msg='add sections'):
            model['sections'].append({
                'id': str(uuid.uuid4()),
                'name': 'polarised neptune',
                'type': 'text',
                'text': 'medial bodging committed unworthier',
                'links': []
            })
            model['sections'].append({
                'id': str(uuid.uuid4()),
                'name': 'ostrich drainpipe',
                'type': 'text',
                'text': 'novices rehearing leafier stationer',
                'links': [],
            })
            for i, sec in enumerate(model['sections']):
                sec['index'] = i

            response = self.client.put(
                path,
                model,
                format='json'
            )
            for i, sec in enumerate(model['sections']):
                sec['page'] = str(self.page.id)

            self.assertEqual(response.json(), model)

        with self.subTest(msg='update'):
            model['sections'][0]['text'] = 'selected Kantian manifolds'
            response = self.client.put(
                path,
                model,
                format='json'
            )
            self.assertEqual(response.json(), model)

        with self.subTest(msg='update, delete, create'):
            # delete first section
            model['sections'].pop(0)
            # update second section
            model['sections'][0]['name'] = 'encapsulate altarpiece'
            # add a new section
            model['sections'].append({
                'id': str(uuid.uuid4()),
                'name': 'sacrifice liberates',
                'type': 'text',
                'text': 'possessive colonoscopies suburbans',
                'links': [],
                'page': str(self.page.id)
            })
            for i, sec in enumerate(model['sections']):
                sec['index'] = i

            response = self.client.put(
                path,
                model,
                format='json'
            )
            self.assertEqual(response.json(), model)

################################################################################
# SECTION
################################################################################


class SectionTest(UserMixin, PortfolioMixin, APITestCase):
    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        self.setUpUser()
        self.setUpPortfolio()

    def test_section_create(self):
        data = {
            'name': 'nervous pillowcase',
            'index': 0,
            'type': 'text',
            'text': 'lorem ipsum',
            'id': str(uuid.uuid4()),
            'links': []
        }
        response = self.client.post(
            reverse(
                'section_list',
                kwargs={
                    'page_id': self.page.id,
                }
            ),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 201)
        for key, val in data.items():
            self.assertEqual(response.data.get(key), val)

        section = models.Section.objects.get(id=response.data.get('id'))
        self.assertEqual(section.name, response.data['name'])
        self.assertEqual(section.index, response.data['index'])
        self.assertEqual(section.type, response.data['type'])
        self.assertEqual(section.text, response.data['text'])
        self.assertEqual(str(section.id), response.data['id'])

    def test_section_validation(self):
        data = {
            'name': 'a' * 251,
            'index': 0,
            'type': 'text',
            'text': 'lorem ipsum'
        }
        response = self.client.post(
            reverse(
                'section_list',
                kwargs={
                    'page_id': self.page.id,
                }
            ),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 400)

    def test_section_retrieve(self):
        response = self.client.get(
            reverse(
                'section_detail',
                kwargs={
                    'section_id': self.section.id,
                }
            )
        )
        expected = {
            'id': str(self.section.id),
            'name': self.section.name,
            'index': self.section.index,
            'type': self.section.type,
            'text': self.section.text,
            'page': self.page.id,
            'links': self.section.links,
        }
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.section.name, response.data['name'])
        self.assertEqual(self.section.index, response.data['index'])
        self.assertEqual(self.section.type, response.data['type'])
        self.assertEqual(self.section.text, response.data['text'])
        self.assertEqual(str(self.section.id), response.data['id'])
        self.assertEqual(10, len(response.data['links']))

    def test_section_update(self):
        name = 'spunky horticulturists'
        text = 'directionless equipages'

        def update_field(field, val):
            response = self.client.patch(
                reverse(
                    'section_detail',
                    kwargs={
                        'section_id': self.section.id,
                    }
                ),
                {field: val},
                format='json',
            )
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.data.get(field), val)

        with self.subTest(field='name'):
            initial_data = copy.deepcopy(
                serializers.SectionSerializer(self.section).data)

            update_field('name', name)

            # clear out cached data
            self.section.refresh_from_db()

            self.assertEqual(self.section.name, name)
            self.assertEqual(self.section.page, self.page)
            self.assertEqual(self.section.type, 'text')
            self.assertEqual(self.section.index, initial_data.get('index'))
            self.assertEqual(self.section.text, initial_data.get('text'))

        with self.subTest(field='text'):
            initial_data = copy.deepcopy(
                serializers.SectionSerializer(self.section).data)

            update_field('text', text)

            # clear out cached data
            self.section.refresh_from_db()

            self.assertEqual(self.section.name, initial_data.get('name'))
            self.assertEqual(self.section.page, self.page)
            self.assertEqual(self.section.type, 'text')
            self.assertEqual(self.section.index, initial_data.get('index'))
            self.assertEqual(self.section.text, text)

    def test_section_delete(self):
        response = self.client.delete(
            reverse(
                'section_detail',
                kwargs={
                    'section_id': self.section.id,
                }
            )
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            len(models.Section.objects.filter(id=self.section.id)),
            0
        )

################################################################################
# LINK
################################################################################


class LinkTest(UserMixin, PortfolioMixin, APITestCase):
    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        self.setUpUser()
        self.setUpPortfolio()

    def test_section_link_create(self):
        data = {
            "id": str(uuid.uuid4()),
            "name": "string",
            "icon": 2,
            "address": "string",
            "index": 0,
        }

        response = self.client.post(
            reverse(
                'section_link_list',
                kwargs={
                    'section_id': self.section.id,
                }
            ),
            data,
            format='json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['section'], self.section.id)
        self.assertEqual(response.data['id'], data['id'])
        self.assertEqual(response.data['icon'], data['icon'])
        self.assertEqual(response.data
                         ['address'], data['address'])
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.data['index'], data['index'])

    def test_portfolio_link_create(self):
        data = {
            "id": str(uuid.uuid4()),
            "name": "string",
                    "icon": 2,
                    "address": "string",
                    "index": 0,
        }

        response = self.client.post(
            reverse(
                'portfolio_link_list',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                }
            ),
            data,
            format='json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['portfolio'], self.portfolio.id)
        self.assertEqual(response.data['id'], data['id'])
        self.assertEqual(response.data['icon'], data['icon'])
        self.assertEqual(response.data
                         ['address'], data['address'])
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.data['index'], data['index'])

    def test_section_link_update(self):
        data = {
            "icon": 2,
            "name": "New name",
            "address": "http://newlink.com",
            "index": self.section_link.index,
        }
        response = self.client.patch(
            reverse(
                'section_link_detail',
                kwargs={
                    'link_id': self.section_link.id,
                }
            ),
            data,
            format='json'
        )

        stored_link = models.SectionLink.objects.get(id=self.section_link.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(str(stored_link.id), response.data['id'])
        self.assertEqual(stored_link.icon, data['icon'])
        self.assertEqual(stored_link.address, data['address'])
        self.assertEqual(stored_link.name, data['name'])
        self.assertEqual(stored_link.index, data['index'])

    def test_portfolio_link_update(self):
        data = {
            "icon": 2,
            "name": "New name",
            "address": "http://newlink.com",
            "index": self.portfolio_link.index,
        }
        response = self.client.patch(
            reverse(
                'portfolio_link_detail',
                kwargs={
                    'link_id': self.portfolio_link.id,
                }
            ),
            data,
            format='json'
        )
        stored_link = models.PortfolioLink.objects.get(
            id=self.portfolio_link.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(str(stored_link.id), response.data['id'])
        self.assertEqual(stored_link.icon, data['icon'])
        self.assertEqual(stored_link.address, data['address'])
        self.assertEqual(stored_link.name, data['name'])
        self.assertEqual(stored_link.index, data['index'])

    def test_section_link_validation(self):
        name = 'a' * 101
        data = {'name': name}
        response = self.client.post(
            reverse(
                'section_link_list',
                kwargs={
                    'section_id': self.section.id,
                }
            ),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 400)

    def test_portfolio_link_validation(self):
        name = 'a' * 101
        data = {'name': name}
        response = self.client.post(
            reverse(
                'portfolio_link_list',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                }
            ),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 400)

    def test_section_link_retrieve(self):
        response = self.client.get(
            reverse(
                'section_link_detail',
                kwargs={
                    'link_id': self.section_link.id
                }
            )
        )
        stored_link = models.SectionLink.objects.get(id=self.section_link.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(str(stored_link.id), response.data['id'])
        self.assertEqual(stored_link.icon, response.data['icon'])
        self.assertEqual(stored_link.address, response.data['address'])
        self.assertEqual(stored_link.name, response.data['name'])
        self.assertEqual(stored_link.index, response.data['index'])

    def test_portfolio_link_retrieve(self):
        response = self.client.get(
            reverse(
                'portfolio_link_detail',
                kwargs={
                    'link_id': self.portfolio_link.id
                }
            )
        )
        stored_link = models.PortfolioLink.objects.get(
            id=self.portfolio_link.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(str(stored_link.id), response.data['id'])
        self.assertEqual(stored_link.icon, response.data['icon'])
        self.assertEqual(stored_link.address, response.data['address'])
        self.assertEqual(stored_link.name, response.data['name'])
        self.assertEqual(stored_link.index, response.data['index'])

    def test_section_link_delete(self):
        response = self.client.delete(
            reverse(
                'section_link_detail',
                kwargs={
                    'link_id': self.section_link.id,
                }
            )
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            len(models.SectionLink.objects.filter(
                id=self.section_link.id)),
            0
        )

    def test_portfolio_link_delete(self):
        response = self.client.delete(
            reverse(
                'portfolio_link_detail',
                kwargs={
                    'link_id': self.portfolio_link.id,
                }
            )
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            len(models.PortfolioLink.objects.filter(
                id=self.portfolio_link.id)),
            0
        )


################################################################################
# IMAGE
################################################################################
class ImageTest(UserMixin, PortfolioMixin, APITestCase):

    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        self.setUpUser()
        self.setUpPortfolio()

        for i in range(10):
            file = tempfile.NamedTemporaryFile(suffix='.png')
            image_file = ImageFile(file, name=file.name)
            image = models.Image.objects.create(
                path=image_file,
                owner=self.user,
                name='image' + str(i),
            )
            if i == 0:
                self.image = image

    def test_image_create(self):
        with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as f:
            image = Image.new('RGB', (200, 200), 'white')
            image.save(f, 'PNG')
        test_image = open(f.name, mode='rb')
        data = {
            'name': 'test_image',
            'path': test_image,
        }
        response = self.client.post(
            reverse(
                'image_list',
            ),
            data=data
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(models.Image.objects.all()), 11)
        self.assertEqual(response.data['name'], data['name'])

    def test_image_validation(self):
        name = 'a' * 101
        data = {'name': name}
        response = self.client.post(
            reverse('image_list'),
            data,
        )
        self.assertEqual(response.status_code, 400)

    def test_image_retrieve(self):
        response = self.client.get(
            reverse(
                'image_detail',
                kwargs={
                    'image_id': self.image.id,
                }
            ),
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(str(self.image.id), response.data['id'])
        self.assertEqual(self.portfolio.owner.id, response.data['owner'])
        self.assertEqual(self.image.name, response.data['name'])

    def test_image_update(self):
        name = 'new image name'
        response = self.client.patch(
            reverse(
                'image_detail',
                kwargs={
                    'image_id': self.image.id,
                }
            ),
            {'name': name},
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('name'), name)
        self.assertEqual(str(self.image.id), response.data['id'])

    def test_image_delete(self):
        response = self.client.delete(
            reverse(
                'image_detail',
                kwargs={
                    'image_id': self.image.id,
                }
            )
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            len(models.Image.objects.filter(id=self.image.id)),
            0
        )
        self.assertEqual(
            len(models.Image.objects.all()),
            9
        )

################################################################################
# PERMISSIONS
################################################################################


class PermissionTest(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(
            username='ludwig',
            password='marvellinggranola',
            email='ludwig@example.com',
        )
        self.other_user = User.objects.create_user(
            username='alfred',
            password='curlingstirrups',
            email='alfred@example.com',
        )

        # PORTFOLIO 1
        self.public_portfolio = models.Portfolio.objects.create(
            owner=self.owner,
            name='oestrous sorceresses',
            private=False,
        )
        self.public_page = models.Page.objects.create(
            portfolio=self.public_portfolio,
            name='regimented archdeacon',
            index=0,
        )
        self.public_section = models.Section.objects.create(
            page=self.public_page,
            name='unscrupulous accumulations',
            type='text',
            text='sympathizer devastator',
            index=0
        )

        # PORTFOLIO 2
        self.private_portfolio = models.Portfolio.objects.create(
            owner=self.owner,
            name='unscrambled machinations',
            private=True,
        )
        self.private_page = models.Page.objects.create(
            portfolio=self.private_portfolio,
            name='curried interpretation',
            index=0,
        )
        self.private_section = models.Section.objects.create(
            page=self.private_page,
            name='loiterer republic',
            type='text',
            text='diabolic subcommittee',
            index=0,
        )

    def portfolio_list_helper(self, status_codes):
        response = self.client.get(reverse('portfolio_list'))
        self.assertEqual(response.status_code, status_codes[0])

        response = self.client.post(
            reverse('portfolio_list'),
            {
                'name': 'grasshoppers equation',
                'links': []
            },
            format='json',
        )
        self.assertEqual(response.status_code, status_codes[1])

    def portfolio_detail_helper(self, portfolio_id, status_codes):
        response = self.client.get(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': portfolio_id,
                }
            )
        )
        self.assertEqual(response.status_code, status_codes[0])

        response = self.client.patch(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': portfolio_id,
                }
            ),
            {
                'name': 'walking insolvents'
            },
            format='json',
        )
        self.assertEqual(response.status_code, status_codes[1])

    def page_helper(self, portfolio_id, page_id, status_codes):
        response = self.client.get(
            reverse(
                'page_list',
                kwargs={
                    'portfolio_id': portfolio_id,
                }
            )
        )
        self.assertEqual(response.status_code, status_codes[0])

        response = self.client.post(
            reverse(
                'page_list',
                kwargs={
                    'portfolio_id': portfolio_id,
                }
            ),
            {
                'id': str(uuid.uuid4()),
                'name': 'supposed novices',
                'index': 0,
                'sections': [],
            },
            format='json',
        )
        self.assertEqual(response.status_code, status_codes[1])

        response = self.client.get(
            reverse(
                'page_detail',
                kwargs={
                    'page_id': page_id,
                }
            )
        )
        self.assertEqual(response.status_code, status_codes[2])

        response = self.client.patch(
            reverse(
                'page_detail',
                kwargs={
                    'page_id': page_id,
                }
            ),
            {
                'name': 'deliriously tuneful'
            },
            format='json',
        )
        self.assertEqual(response.status_code, status_codes[3])

    def section_helper(self, portfolio_id, page_id, section_id, status_codes):
        response = self.client.get(
            reverse(
                'section_list',
                kwargs={
                    'page_id': page_id,
                }
            )
        )
        self.assertEqual(response.status_code, status_codes[0])

        response = self.client.post(
            reverse(
                'section_list',
                kwargs={
                    'page_id': page_id,
                }
            ),
            {
                'id': str(uuid.uuid4()),
                'name': 'ostracizing sweetheart',
                'type': 'text',
                'index': 0,
                'text': 'bonged scandalmongers',
                'links': [],
            },
            format='json',
        )
        self.assertEqual(response.status_code, status_codes[1])

        response = self.client.get(
            reverse(
                'section_detail',
                kwargs={
                    'section_id': section_id,
                }
            )
        )
        self.assertEqual(response.status_code, status_codes[2])

        response = self.client.patch(
            reverse(
                'section_detail',
                kwargs={
                    'section_id': section_id,
                }
            ),
            {
                'name': 'reincarnated waterwheels'
            },
            format='json',
        )
        self.assertEqual(response.status_code, status_codes[3])

    def test_owner(self):
        # pylint: disable=no-member
        self.client.force_authenticate(user=self.owner)
        with self.subTest(msg='portfolio list'):
            self.portfolio_list_helper(
                [200, 201]
            )
        with self.subTest(msg='public portfolio'):
            self.portfolio_detail_helper(
                self.public_portfolio.id,
                [200, 200]
            )
        with self.subTest(msg='private portfolio'):
            self.portfolio_detail_helper(
                self.private_portfolio.id,
                [200, 200]
            )
        with self.subTest(msg='public page'):
            self.page_helper(
                self.public_portfolio.id,
                self.public_page.id,
                [200, 201, 200, 200]
            )
        with self.subTest(msg='private page'):
            self.page_helper(
                self.private_portfolio.id,
                self.private_page.id,
                [200, 201, 200, 200]
            )
        with self.subTest(msg='public section'):
            self.section_helper(
                self.public_portfolio.id,
                self.public_page.id,
                self.public_section.id,
                [200, 201, 200, 200]
            )
        with self.subTest(msg='private section'):
            self.section_helper(
                self.private_portfolio.id,
                self.private_page.id,
                self.private_section.id,
                [200, 201, 200, 200]
            )

    def test_logged_in(self):
        # pylint: disable=no-member
        self.client.force_authenticate(user=self.other_user)
        with self.subTest(msg='portfolio list'):
            self.portfolio_list_helper(
                [200, 201]
            )
        with self.subTest(msg='public portfolio'):
            self.portfolio_detail_helper(
                self.public_portfolio.id,
                [200, 403]
            )
        with self.subTest(msg='private portfolio'):
            self.portfolio_detail_helper(
                self.private_portfolio.id,
                [403, 403]
            )
        with self.subTest(msg='public page'):
            self.page_helper(
                self.public_portfolio.id,
                self.public_page.id,
                [200, 403, 200, 403]
            )
        with self.subTest(msg='private page'):
            self.page_helper(
                self.private_portfolio.id,
                self.private_page.id,
                [403, 403, 403, 403]
            )
        with self.subTest(msg='public section'):
            self.section_helper(
                self.public_portfolio.id,
                self.public_page.id,
                self.public_section.id,
                [200, 403, 200, 403]
            )
        with self.subTest(msg='private section'):
            self.section_helper(
                self.private_portfolio.id,
                self.private_page.id,
                self.private_section.id,
                [403, 403, 403, 403]
            )

    def test_anonymous(self):
        # pylint: disable=no-member
        self.client.force_authenticate(user=None)
        with self.subTest(msg='portfolio list'):
            self.portfolio_list_helper(
                [200, 401]
            )
        with self.subTest(msg='public portfolio'):
            self.portfolio_detail_helper(
                self.public_portfolio.id,
                [200, 401]
            )
        with self.subTest(msg='private portfolio'):
            self.portfolio_detail_helper(
                self.private_portfolio.id,
                [401, 401]
            )
        with self.subTest(msg='public page'):
            self.page_helper(
                self.public_portfolio.id,
                self.public_page.id,
                [200, 401, 200, 401]
            )
        with self.subTest(msg='private page'):
            self.page_helper(
                self.private_portfolio.id,
                self.private_page.id,
                [401, 401, 401, 401]
            )
        with self.subTest(msg='public section'):
            self.section_helper(
                self.public_portfolio.id,
                self.public_page.id,
                self.public_section.id,
                [200, 401, 200, 401]
            )
        with self.subTest(msg='private section'):
            self.section_helper(
                self.private_portfolio.id,
                self.private_page.id,
                self.private_section.id,
                [401, 401, 401, 401]
            )
